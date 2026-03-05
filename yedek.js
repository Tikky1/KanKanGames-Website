if (!window.GetParentResourceName) {
    console.log("🚧 WebStorm/Tarayıcı Modu: Test ortamı hazırlanıyor...");

    window.GetParentResourceName = () => "test-resource";
    window.fetch = async () => ({json: async () => ({success: true})});
    window.showNotification = (msg) => console.log(`📢 [BİLDİRİM]: ${msg}`);

    if (typeof openMiniGame !== 'undefined') window.openMiniGame = openMiniGame;

    setTimeout(() => {
        console.log("🚀 Sadece Sandviç Oyunu Başlatılıyor...");

        if (typeof openMiniGame === 'function') {
            openMiniGame('coffee');
        }

        const mainMenu = document.querySelector(".craft");
        if (mainMenu) {
            mainMenu.style.display = "none";
        }

    }, 500);
}

const container = document.querySelector(".craft-actions");
const maincraft = document.querySelector(".craft");
const overlay = document.querySelector(".craft-menu-overlay");
const craftMenu = document.querySelector(".craft-menu");
const craftIcon = craftMenu.querySelector(".craft-icon");
const craftNameText = craftMenu.querySelector(".craft-name-text");
const ingredientsList = craftMenu.querySelector(".ingredients-list");
const craftButtonAction = craftMenu.querySelector(".craft-button-action");
const reduceBtn = craftMenu.querySelector(".reduce-button");
const increaseBtn = craftMenu.querySelector(".increase-button");
const countElem = craftMenu.querySelector(".count");
const searchInput = document.getElementById("search-input");
const navButtons = document.querySelectorAll(".nav-button");


let currentIngredients = [];
let currentCount = 1;
let currentItemName;
let activeCategory = "all";
const steamAPIKey = '96D08B24887B9471F5E21B5CDC498BC3';
const profileCache = {};
let craftItems = [];
import {locales, currentLocale, switchLocale} from './locales.js';

let maxItemCount = 10;

const soundCorrect = new Audio("assets/sounds/correct.mp3");
soundCorrect.volume = 0.3;
const soundWrong = new Audio("assets/sounds/wrong.mp3");
soundWrong.volume = 0.3;
const popUp = new Audio("assets/sounds/popup.mp3");
popUp.volume = 0.3;
const popUpr = new Audio("assets/sounds/popupreverse.mp3");
popUpr.volume = 0.3;
const mgame1 = new Audio("assets/sounds/minigame1.mp3");
mgame1.volume = 0.3;
const mgame2 = new Audio("assets/sounds/minigame2.mp3");
mgame2.volume = 0.3;
mgame2.loop = true;
const mgame3 = new Audio("assets/sounds/minigame3.mp3");
mgame3.volume = 0.3;
mgame3.loop = true;
const mgame4 = new Audio("assets/sounds/minigame1.mp3");
mgame4.volume = 0;

function showNotification(message) {
    const notify = document.getElementById('notify');
    if (!notify) {
        return;
    }

    const messageDiv = notify.querySelector('.notify-message');
    const closeBtn = notify.querySelector('.close-btn');

    messageDiv.textContent = message;
    notify.classList.add('show');

    closeBtn.onclick = () => {
        notify.classList.remove('show');
    };

    setTimeout(() => {
        notify.classList.remove('show');
    }, 2500);
}

function hexToSteamID(hex) {
    return BigInt("0x" + hex).toString();
}

function fetchSteamProfileImage(steamID) {
    if (profileCache[steamID]) {
        return Promise.resolve(profileCache[steamID]);
    }

    return fetch(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${steamAPIKey}&steamids=${steamID}`)
        .then(response => response.json())
        .then(data => {
            const profile = data.response.players[0];
            profileCache[steamID] = profile.avatarfull;
            return profile.avatarfull;
        })
        .catch(error => {
            return 'assets/img/avatar.png';
        });
}

function updateIngredientsList() {
    ingredientsList.innerHTML = "";
    currentIngredients.forEach(ing => {
        const ingDiv = document.createElement("div");
        ingDiv.className = "ingredient-item";

        const img = document.createElement("img");
        img.className = "ingredient-icon";
        img.src = ing.icon;
        img.alt = ing.name;

        const span = document.createElement("span");
        span.className = "ingredient-text";
        span.textContent = `${ing.amount * currentCount}x ${ing.title}`;

        ingDiv.appendChild(img);
        ingDiv.appendChild(span);

        ingredientsList.appendChild(ingDiv);
    });
}

reduceBtn.addEventListener("click", () => {
    if (currentCount > 1) {
        currentCount--;
        countElem.textContent = currentCount;
        updateIngredientsList();
    }
});

increaseBtn.addEventListener("click", () => {
    if (currentCount >= maxItemCount) {
        soundWrong.pause();
        soundWrong.currentTime = 0;
        soundWrong.play()
        showNotification(locales[currentLocale].max_item_count_warning);
        return;
    }

    currentCount++;
    countElem.textContent = currentCount;
    updateIngredientsList();
});

overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
        overlay.style.display = "none";
    }
});

container.addEventListener("click", (e) => {
    if (e.target.classList.contains("craft-button")) {
        const card = e.target.closest(".craft-item");
        if (!card) return;
        popUp.pause();
        popUp.currentTime = 0;
        popUp.play()
        const itemLabel = card.querySelector(".craft-name").textContent;
        const iconSrc = card.querySelector(".craft-icon").src;
        const itemType = card.getAttribute("data-type");
        const itemName = card.getAttribute("data-itemname");

        currentIngredients = JSON.parse(card.getAttribute("data-ingredients"));
        currentCount = 1;
        countElem.textContent = currentCount;
        craftIcon.src = iconSrc;
        craftIcon.alt = itemName;
        craftNameText.textContent = itemLabel;
        updateIngredientsList();

        overlay.style.display = "flex";

        craftButtonAction.onclick = () => {
            overlay.style.display = "none";
            currentItemName = itemName;
            tryStartMiniGame(itemName, itemType);
        };
    }
});

function renderCraftItems(items) {
    container.innerHTML = "";

    items.forEach(item => {
        const card = document.createElement("div");
        card.className = "craft-item card";
        card.setAttribute("data-type", item.category);
        card.setAttribute("data-itemname", item.item);
        card.setAttribute("data-ingredients", JSON.stringify(item.ingredients));

        const img = document.createElement("img");
        img.className = "craft-icon";
        img.src = item.icon;
        img.alt = item.name;

        const name = document.createElement("div");
        name.className = "craft-name";
        name.textContent = item.title;

        const button = document.createElement("button");
        button.className = "craft-button button";
        button.textContent = locales[currentLocale].craft_button_text;

        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(button);

        container.appendChild(card);
    });
}

function filterAndRenderItems() {
    const query = searchInput.value.toLowerCase();

    const filtered = craftItems.filter(item => {
        const nameMatch = item.title.toLowerCase().includes(query);
        const typeMatch = activeCategory === "all" || item.category === activeCategory;
        return nameMatch && typeMatch;
    });

    renderCraftItems(filtered);
}

searchInput.addEventListener("input", filterAndRenderItems);

navButtons.forEach(button => {
    button.addEventListener("click", () => {
        activeCategory = button.getAttribute("data-type");

        if (activeCategory === "exit") {
            fetch(`https://${GetParentResourceName()}/ExitButton`, {
                method: 'POST', headers: {
                    'Content-Type': 'application/json'
                }, body: JSON.stringify({})
            });
        } else {
            popUp.pause();
            popUp.currentTime = 0;
            popUp.play()
            navButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            filterAndRenderItems();
        }
    });
});

let draggingItem = null;
let offsetX = 0, offsetY = 0;
let mergedCount = 0;
let finishTimeout = null;

const empty = document.getElementById('empty');
const full = document.getElementById('full');
const smallItems = document.querySelectorAll('.craft-item.small');
const overlapGroup = document.querySelector('.overlap-group');
const drinkCraft = document.querySelector('.drink-craft');

function addDragAndDrop(item) {
    item.addEventListener('mousedown', e => {
        if (draggingItem === null && item.style.display !== 'none') {

            if (item.id === 'full') {
                finishTimeout = setTimeout(() => {
                    setTimeout(() => {
                        closeAllMiniGames();
                        fetch(`https://${GetParentResourceName()}/completeCraft`, {
                            method: 'POST', headers: {
                                'Content-Type': 'application/json'
                            }, body: JSON.stringify({
                                itemname: currentItemName, count: currentCount
                            })
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data) {
                                    soundCorrect.pause();
                                    soundCorrect.currentTime = 0;
                                    soundCorrect.play()
                                    showNotification(locales[currentLocale].give_item_success);
                                } else {
                                    soundWrong.pause();
                                    soundWrong.currentTime = 0;
                                    soundWrong.play()
                                    showNotification(locales[currentLocale].give_item_fail);
                                }
                            })
                            .catch(error => {
                                soundWrong.pause();
                                soundWrong.currentTime = 0;
                                soundWrong.play()
                                showNotification(locales[currentLocale].give_item_fail_with_error + error);
                            });


                    }, 1500);

                    draggingItem = null;
                    item.style.cursor = 'grab';
                }, 3000);
            }

            draggingItem = item;
            const rect = item.getBoundingClientRect();
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;

            item.style.zIndex = 1000;
            item.style.pointerEvents = 'none';
            item.style.cursor = 'grabbing';
        }
    });
}

smallItems.forEach(addDragAndDrop);
addDragAndDrop(full);

document.addEventListener('mousemove', e => {
    if (draggingItem) {
        const groupRect = overlapGroup.getBoundingClientRect();
        const newLeft = e.clientX - groupRect.left - offsetX;
        const newTop = e.clientY - groupRect.top - offsetY;

        draggingItem.style.position = 'absolute';
        draggingItem.style.left = `${newLeft}px`;
        draggingItem.style.top = `${newTop}px`;
    }
});

document.addEventListener('mouseup', e => {
    if (draggingItem) {
        if (draggingItem.id === 'full') {
            if (finishTimeout) {
                clearTimeout(finishTimeout);
            }
        } else {
            const dropTarget = empty.getBoundingClientRect();
            const itemRect = draggingItem.getBoundingClientRect();
            const emptyTopPouringZone = dropTarget.top + dropTarget.height * 0.3;

            const isInside = itemRect.left < dropTarget.right && itemRect.right > dropTarget.left && itemRect.bottom > dropTarget.top && itemRect.top < emptyTopPouringZone && !draggingItem.classList.contains('used');

            if (isInside) {
                const itemToAnimate = draggingItem;
                itemToAnimate.classList.add('rotate', 'used');
                mgame1.pause();
                mgame1.currentTime = 0;
                mgame1.play()

                itemToAnimate.addEventListener('animationend', () => {
                    if (itemToAnimate) {
                        mgame1.pause();
                        mgame1.currentTime = 0;
                        itemToAnimate.style.display = 'none';
                        ;
                    }

                    mergedCount++;

                    if (mergedCount === 3) {
                        empty.style.display = 'none';
                        full.style.display = 'block';
                        full.style.cursor = 'grab';
                    }
                }, {once: true});

            }
        }

        draggingItem.style.pointerEvents = 'auto';
        if (draggingItem) {
            draggingItem.style.cursor = 'grab';
            draggingItem.style.zIndex = '';
        }
        draggingItem = null;
    }
});

let draggingPiece = null;
let dragOffsetX = 0, dragOffsetY = 0;
let mergedPiecesCount = 0;
let previousMouseX = 0, previousMouseY = 0;

const OPACITY_INCREMENT = 0.0015;
const MIN_MOVEMENT_THRESHOLD = 5;

const emptyPlate = document.getElementById('empty-plate');
const fullCake = document.getElementById('full-cake');
const smallPieces = document.querySelectorAll('.cake-craft-item.small');
const overlapGroup2 = document.querySelector('.overlap-group2');
const dessertCraft = document.querySelector('.dessert-craft');

let currentFullCakeOpacity = 0;

function addCakeDragAndDrop(item) {
    item.addEventListener('mousedown', e => {
        if (draggingPiece === null && !item.classList.contains('used')) {
            draggingPiece = item;

            const rect = item.getBoundingClientRect();
            dragOffsetX = e.clientX - rect.left;
            dragOffsetY = e.clientY - rect.top;

            item.style.zIndex = 1000;
            item.style.cursor = 'grabbing';

            previousMouseX = e.clientX;
            previousMouseY = e.clientY;

            if (currentFullCakeOpacity > 0) {
                fullCake.style.opacity = currentFullCakeOpacity;
            }
        }
    });
}

smallPieces.forEach(addCakeDragAndDrop);

document.addEventListener('mousemove', e => {
    if (draggingPiece) {
        const groupRect = overlapGroup2.getBoundingClientRect();
        const newLeft = e.clientX - dragOffsetX - groupRect.left;
        const newTop = e.clientY - dragOffsetY - groupRect.top;

        draggingPiece.style.position = 'absolute';
        draggingPiece.style.left = `${newLeft}px`;
        draggingPiece.style.top = `${newTop}px`;

        const emptyPlateRect = emptyPlate.getBoundingClientRect();
        const pieceRect = draggingPiece.getBoundingClientRect();

        const isOverPlate = pieceRect.left < emptyPlateRect.right && pieceRect.right > emptyPlateRect.left && pieceRect.top < emptyPlateRect.bottom && pieceRect.bottom > emptyPlateRect.top;

        const deltaX = Math.abs(e.clientX - previousMouseX);
        const deltaY = Math.abs(e.clientY - previousMouseY);
        const hasMoved = (deltaX + deltaY) > MIN_MOVEMENT_THRESHOLD;

        if (isOverPlate && hasMoved) {
            const oldOpacity = currentFullCakeOpacity;
            currentFullCakeOpacity += OPACITY_INCREMENT;
            if (currentFullCakeOpacity > 1) currentFullCakeOpacity = 1;

            if (mgame2.paused) {
                mgame2.play();
            }

            if (currentFullCakeOpacity >= 1) {
                currentFullCakeOpacity = 1;
                mgame2.pause();
                mgame2.currentTime = 0;
                placePieceOntoPlate();
            }

            fullCake.style.display = 'block';
            fullCake.style.opacity = currentFullCakeOpacity;

        } else if (isOverPlate && !hasMoved) {
            fullCake.style.display = 'block';
            fullCake.style.opacity = currentFullCakeOpacity;

            if (mgame2.paused) {
                mgame2.play();
            }

        } else if (!isOverPlate) {
            fullCake.style.display = 'block';

            if (!mgame2.paused) {
                mgame2.pause();
                mgame2.currentTime = 0;
            }
        }

        previousMouseX = e.clientX;
        previousMouseY = e.clientY;
    }
});

document.addEventListener('mouseup', e => {
    if (draggingPiece) {
        const emptyPlateRect = emptyPlate.getBoundingClientRect();
        const pieceRect = draggingPiece.getBoundingClientRect();

        const isOverPlate = pieceRect.left < emptyPlateRect.right && pieceRect.right > emptyPlateRect.left && pieceRect.top < emptyPlateRect.bottom && pieceRect.bottom > emptyPlateRect.top;

        if (!isOverPlate) {
            currentFullCakeOpacity = 0;
            fullCake.style.opacity = 0;

            if (!mgame2.paused) {
                mgame2.pause();
                mgame2.currentTime = 0;
            }
        }

        draggingPiece.style.zIndex = '';
        draggingPiece.style.cursor = 'grab';
        draggingPiece = null;
    }
});

function placePieceOntoPlate() {
    if (draggingPiece && currentFullCakeOpacity >= 1) {
        draggingPiece.classList.add('used');
        draggingPiece.style.display = 'none';

        mergedPiecesCount++;

        if (mergedPiecesCount === smallPieces.length) {
            setTimeout(() => {
                currentFullCakeOpacity = 0;
                fullCake.style.opacity = 1;
                dessertCraft.style.display = 'none';
                closeAllMiniGames();

                fetch(`https://${GetParentResourceName()}/completeCraft`, {
                    method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({
                        itemname: currentItemName, count: currentCount
                    })
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data) {
                            soundCorrect.pause();
                            soundCorrect.currentTime = 0;
                            soundCorrect.play();
                            showNotification(locales[currentLocale].give_item_success);
                        } else {
                            soundWrong.pause();
                            soundWrong.currentTime = 0;
                            soundWrong.play();
                            showNotification(locales[currentLocale].give_item_fail);
                        }
                    })
                    .catch(error => {
                        soundWrong.pause();
                        soundWrong.currentTime = 0;
                        soundWrong.play();
                        showNotification(locales[currentLocale].give_item_fail_with_error + error);
                    });

            }, 1500);
        }
        draggingPiece = null;
    }
}

let currentSpoon = null;
let spoonOffsetX = 0, spoonOffsetY = 0;
let mixingTime = 0;
let mixingInterval = null;
let lastMouseX = 0, lastMouseY = 0;
let isMixing = false;

const REQUIRED_MIXING_TIME = 5000;
const MIN_MOVEMENT_THRESHOLD_MIXING = 5;
const MIXING_AREA_HEIGHT = 225;

const foodPan = document.getElementById('food-pan');
const foodSpoon = document.getElementById('food-spoon');
const foodCraft = document.querySelector('.food-craft');
const panContainer = document.querySelector('.overlap-group3');

foodSpoon.addEventListener('mousedown', e => {
    if (currentSpoon === null) {

        currentSpoon = foodSpoon;
        const rect = foodSpoon.getBoundingClientRect();
        spoonOffsetX = e.clientX - rect.left;
        spoonOffsetY = e.clientY - rect.top;

        foodSpoon.style.zIndex = 1000;
        foodSpoon.style.cursor = 'grabbing';

        lastMouseX = e.clientX;
        lastMouseY = e.clientY;

        if (!isMixing) {
            isMixing = true;
            mixingInterval = setInterval(() => {
                mixingTime += 100;


                if (mixingTime >= REQUIRED_MIXING_TIME) {
                    finishMixingGame();
                }
            }, 100);
        }
    }
});

document.addEventListener('mousemove', e => {
    if (currentSpoon) {
        const panContainerRect = panContainer.getBoundingClientRect();
        const panRect = foodPan.getBoundingClientRect();

        let newLeft = e.clientX - spoonOffsetX - panContainerRect.left;
        let newTop = e.clientY - spoonOffsetY - panContainerRect.top;

        const spoonRect = currentSpoon.getBoundingClientRect();
        const panLeft = panRect.left - panContainerRect.left;
        const panTop = panRect.top - panContainerRect.top;
        const panRight = panRect.right - panContainerRect.left;

        const panMixingBottom = panTop + MIXING_AREA_HEIGHT;

        if (newLeft < panLeft) {
            newLeft = panLeft;
        }
        if (newLeft + spoonRect.width > panRight) {
            newLeft = panRight - spoonRect.width;
        }

        if (newTop < panTop) {
            newTop = panTop;
        }
        if (newTop + spoonRect.height > panMixingBottom) {
            newTop = panMixingBottom - spoonRect.height;
        }

        currentSpoon.style.left = `${newLeft}px`;
        currentSpoon.style.top = `${newTop}px`;

        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
    }
});

document.addEventListener('mouseup', e => {
    if (currentSpoon) {
        if (mixingInterval) {
            clearInterval(mixingInterval);
            mixingInterval = null;
        }
        mgame3.pause();
        mgame3.currentTime = 0;
        mixingTime = 0;
        isMixing = false;
        currentSpoon.style.zIndex = '';
        currentSpoon.style.cursor = 'grab';
        currentSpoon = null;
    }
});

function finishMixingGame() {
    clearInterval(mixingInterval);
    mixingInterval = null;
    isMixing = false;
    mixingTime = 0;

    if (foodSpoon) {
        foodSpoon.remove();
    }

    setTimeout(() => {
        if (foodCraft) {
            foodCraft.style.display = 'none';
            closeAllMiniGames();
            fetch(`https://${GetParentResourceName()}/completeCraft`, {
                method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({
                    itemname: currentItemName, count: currentCount
                })
            })
                .then(res => res.json())
                .then(data => {
                    if (data) {
                        soundCorrect.pause();
                        soundCorrect.currentTime = 0;
                        soundCorrect.play()
                        showNotification(locales[currentLocale].give_item_success);
                    } else {
                        soundWrong.pause();
                        soundWrong.currentTime = 0;
                        soundWrong.play()
                        showNotification(locales[currentLocale].give_item_fail);
                    }
                })
                .catch(error => {
                    soundWrong.pause();
                    soundWrong.currentTime = 0;
                    soundWrong.play()
                    showNotification(locales[currentLocale].give_item_fail_with_error + error);
                });
        }
    }, 2000);
}

let currentSandwichItem = null;
let sandwichItemIndex = 0;
let isSandwichFalling = false;
let sandwichSwingDirection = 1;
let sandwichSwingPosition = 0;
let sandwichSwingInterval = null;
let sandwichStackedItems = 0;
let baseStackLeft = null;

const sandwichIngredients = [{name: 'bread-bottom', id: 'sandwich-bread-bottom'}, {
    name: 'lettuce',
    id: 'sandwich-lettuce'
}, {name: 'tomato', id: 'sandwich-tomato'}, {name: 'cheese', id: 'sandwich-cheese'}, {
    name: 'bread-top',
    id: 'sandwich-bread-top'
}];

const SANDWICH_SWING_SPEED = 15;
const SANDWICH_SWING_RANGE = 1000;
const SANDWICH_FALL_SPEED = 15;
const SANDWICH_STACK_TOLERANCE = 100;
const SANDWICH_ITEM_HEIGHT = 30;

const sandwichCraft = document.querySelector('.sandwich-craft');
const sandwichContainer = document.querySelector('.overlap-group4');

function startSandwichSwing() {
    if (sandwichSwingInterval) clearInterval(sandwichSwingInterval);

    sandwichSwingInterval = setInterval(() => {
        if (!isSandwichFalling && currentSandwichItem) {
            sandwichSwingPosition += SANDWICH_SWING_SPEED * sandwichSwingDirection;

            if (sandwichSwingPosition >= SANDWICH_SWING_RANGE) {
                sandwichSwingPosition = SANDWICH_SWING_RANGE;
                sandwichSwingDirection = -1;
            } else if (sandwichSwingPosition <= -SANDWICH_SWING_RANGE) {
                sandwichSwingPosition = -SANDWICH_SWING_RANGE;
                sandwichSwingDirection = 1;
            }

            const containerRect = sandwichContainer.getBoundingClientRect();
            const centerX = containerRect.width / 2;
            const newLeft = centerX + sandwichSwingPosition - (currentSandwichItem.offsetWidth / 2);

            currentSandwichItem.style.left = `${newLeft}px`;
        }
    }, 16);
}

function dropSandwichItem() {
    if (isSandwichFalling || !currentSandwichItem) return;

    isSandwichFalling = true;
    if (sandwichSwingInterval) {
        clearInterval(sandwichSwingInterval);
        sandwichSwingInterval = null;
    }

    const containerRect = sandwichContainer.getBoundingClientRect();

    const dropInterval = setInterval(() => {
        const currentTop = parseFloat(currentSandwichItem.style.top) || 0;
        const targetTop = sandwichContainer.offsetHeight - (sandwichStackedItems * SANDWICH_ITEM_HEIGHT) - 100;

        if (currentTop >= targetTop) {
            clearInterval(dropInterval);
            currentSandwichItem.style.top = `${targetTop}px`;

            const currentItemLeft = parseFloat(currentSandwichItem.style.left);
            let isSuccess = false;

            if (sandwichStackedItems === 0) {
                baseStackLeft = currentItemLeft;
                isSuccess = true;
            } else {
                if (Math.abs(currentItemLeft - baseStackLeft) <= SANDWICH_STACK_TOLERANCE) {
                    isSuccess = true;
                    currentSandwichItem.style.left = `${baseStackLeft}px`;
                }
            }

            if (isSuccess) {
                currentSandwichItem.style.cursor = 'default';
                sandwichStackedItems++;

                mgame4.pause();
                mgame4.currentTime = 0;
                mgame4.play();

                if (sandwichStackedItems === sandwichIngredients.length) {
                    finishSandwichGame(true);
                } else {
                    setTimeout(loadNextSandwichItem, 300);
                }
            } else {
                soundWrong.pause();
                soundWrong.currentTime = 0;
                soundWrong.play();

                showNotification(locales[currentLocale].sandwich_fail_misaligned || "Hizalama Başarısız!");

                currentSandwichItem.style.top = '0px';
                isSandwichFalling = false;
                sandwichSwingPosition = 0;
                startSandwichSwing();
            }
        } else {
            currentSandwichItem.style.top = `${currentTop + SANDWICH_FALL_SPEED}px`;
        }
    }, 16);
}

function loadNextSandwichItem() {
    sandwichItemIndex++;
    if (sandwichItemIndex < sandwichIngredients.length) {
        const ingredient = sandwichIngredients[sandwichItemIndex];
        currentSandwichItem = document.getElementById(ingredient.id);

        if (currentSandwichItem) {
            currentSandwichItem.style.display = 'block';
            currentSandwichItem.style.top = '0px';
            currentSandwichItem.style.cursor = 'grabbing';
            isSandwichFalling = false;

            sandwichSwingPosition = 0;
            sandwichSwingDirection = 1;
            startSandwichSwing();
        }
    }
}

function finishSandwichGame(success) {
    if (sandwichSwingInterval) clearInterval(sandwichSwingInterval);

    setTimeout(() => {
        sandwichCraft.style.display = 'none';
        closeAllMiniGames();

        if (success) {
            fetch(`https://${GetParentResourceName()}/completeCraft`, {
                method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({
                    itemname: currentItemName, count: currentCount
                })
            })
                .then(res => res.json())
                .then(data => {
                    if (data) {
                        soundCorrect.play();
                        showNotification(locales[currentLocale].give_item_success);
                    } else {
                        soundWrong.play();
                        showNotification(locales[currentLocale].give_item_fail);
                    }
                });
        }
    }, 1000);
}

document.addEventListener('mousedown', (e) => {
    const isGameOpen = sandwichCraft && sandwichCraft.style.display !== 'none';

    const isLeftClick = e.button === 0;

    if (isGameOpen && isLeftClick && !isSandwichFalling) {
        dropSandwichItem();
    }
});

let isShakeDragging = false;
let shakeProgress = 0;
let shakeOffsetX = 0, shakeOffsetY = 0;
const REQUIRED_SHAKE_AMOUNT = 300;

const shakeContainer = document.querySelector('.overlap-group5');
const shakeEmpty = document.getElementById('shake-empty');
const shakeCream = document.getElementById('shake-cream');
const shakeFull = document.getElementById('shake-full');
const shakeCraft = document.querySelector('.shake-craft');

if (shakeCream) {
    shakeCream.addEventListener('mousedown', (e) => {
        isShakeDragging = true;
        shakeCream.style.cursor = 'grabbing';

        const rect = shakeCream.getBoundingClientRect();
        shakeOffsetX = e.clientX - rect.left;
        shakeOffsetY = e.clientY - rect.top;
    });
}

document.addEventListener('mousemove', (e) => {
    if (!isShakeDragging || !shakeCream || !shakeContainer) return;

    const containerRect = shakeContainer.getBoundingClientRect();

    let newLeft = e.clientX - containerRect.left - shakeOffsetX;
    let newTop = e.clientY - containerRect.top - shakeOffsetY;

    shakeCream.style.left = newLeft + 'px';
    shakeCream.style.top = newTop + 'px';

    if (shakeEmpty && shakeEmpty.style.display !== 'none') {
        const creamRect = shakeCream.getBoundingClientRect();
        const cupRect = shakeEmpty.getBoundingClientRect();

        const isOverlapping = !(creamRect.right < cupRect.left || creamRect.left > cupRect.right || creamRect.bottom < cupRect.top || creamRect.top > cupRect.bottom);

        if (isOverlapping) {
            shakeProgress += 2;

            if (typeof mgame4 !== 'undefined' && mgame4.paused) mgame4.play();

            if (shakeProgress >= REQUIRED_SHAKE_AMOUNT) {
                finishShakeGame(true);
            }
        } else {
            if (typeof mgame4 !== 'undefined') {
                mgame4.pause();
                mgame4.currentTime = 0;
            }
        }
    }
});

document.addEventListener('mouseup', () => {
    if (isShakeDragging) {
        isShakeDragging = false;
        if (shakeCream) shakeCream.style.cursor = 'grab';
        if (typeof mgame4 !== 'undefined') {
            mgame4.pause();
            mgame4.currentTime = 0;
        }
    }
});

function finishShakeGame(success) {
    isShakeDragging = false;

    if (shakeCream) shakeCream.style.display = 'none';
    if (shakeEmpty) shakeEmpty.style.display = 'none';
    if (shakeFull) shakeFull.style.display = 'block';

    if (typeof soundCorrect !== 'undefined') soundCorrect.play();

    setTimeout(() => {
        if (shakeCraft) shakeCraft.style.display = 'none';
        if (typeof closeAllMiniGames === 'function') closeAllMiniGames();

        if (success) {
            const resourceName = window.GetParentResourceName ? window.GetParentResourceName() : "test-resource";
            fetch(`https://${resourceName}/completeCraft`, {
                method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({
                    itemname: typeof currentItemName !== 'undefined' ? currentItemName : 'milkshake',
                    count: typeof currentCount !== 'undefined' ? currentCount : 1
                })
            })
                .then(res => res.json())
                .then(data => {
                    const msg = (typeof locales !== 'undefined' && locales[currentLocale]?.give_item_success) ? locales[currentLocale].give_item_success : "Başarılı!";
                    if (typeof showNotification === 'function') showNotification(msg);
                });
        }
    }, 1000);
}
const BLADE_OFFSET_X = -125;
const BLADE_OFFSET_Y = 125;

let isSlicerDragging = false;
let slicerOffsetX = 0, slicerOffsetY = 0;
let cutsCompleted = 0;
const totalCutsNeeded = 4;
let cutStatus = {1: false, 2: false, 3: false, 4: false};

let activeSliceId = null;
let currentMaxProgress = 0;

const pizzaContainer = document.querySelector('.overlap-group6');
const pizzaSlicer = document.getElementById('pizza-slicer');
const pizzaCraft = document.querySelector('.pizza-craft');
const debugPoint = document.getElementById('debug-point');

const CUT_SEQUENCE = [1, 2, 3, 4];
let currentSequenceIndex = 0;

function positionSlicerForCurrentStep() {
    if (!pizzaSlicer || !activeSliceId) return;

    const pizzaImg = document.getElementById('pizza-full');
    const pizzaRect = pizzaImg.getBoundingClientRect();
    const containerRect = pizzaContainer.getBoundingClientRect();

    const pizzaCenterX = (pizzaRect.left - containerRect.left) + (pizzaRect.width / 2);
    const pizzaCenterY = (pizzaRect.top - containerRect.top) + (pizzaRect.height / 2);

    const startDistance = (pizzaRect.width / 2) * 0.65;

    let startX = pizzaCenterX;
    let startY = pizzaCenterY;

    switch (activeSliceId) {
        case 1:
            startX = pizzaCenterX;
            startY = pizzaCenterY - startDistance;
            break;
        case 2:
            startX = pizzaCenterX - startDistance;
            startY = pizzaCenterY;
            break;
        case 3:
            startX = pizzaCenterX - (startDistance * 0.707);
            startY = pizzaCenterY - (startDistance * 0.707);
            break;
        case 4:
            startX = pizzaCenterX + (startDistance * 0.707);
            startY = pizzaCenterY - (startDistance * 0.707);
            break;
    }

    const slicerHalfW = pizzaSlicer.offsetWidth / 2;
    const slicerHalfH = pizzaSlicer.offsetHeight / 2;

    const finalLeft = startX - BLADE_OFFSET_X - slicerHalfW;
    const finalTop = startY - BLADE_OFFSET_Y - slicerHalfH;

    pizzaSlicer.style.left = finalLeft + 'px';
    pizzaSlicer.style.top = finalTop + 'px';

}

if (pizzaSlicer) {
    pizzaSlicer.addEventListener('mousedown', (e) => {
        isSlicerDragging = true;
        pizzaSlicer.style.cursor = 'grabbing';

        const rect = pizzaSlicer.getBoundingClientRect();
        slicerOffsetX = e.clientX - rect.left;
        slicerOffsetY = e.clientY - rect.top;
    });
}


document.addEventListener('mousemove', (e) => {
    if (!isSlicerDragging || !pizzaSlicer || !pizzaContainer || activeSliceId === null) return;

    const containerRect = pizzaContainer.getBoundingClientRect();
    const pizzaImg = document.getElementById('pizza-full');
    const pizzaRect = pizzaImg.getBoundingClientRect();

    const pizzaCenterX = (pizzaRect.left - containerRect.left) + (pizzaRect.width / 2);
    const pizzaCenterY = (pizzaRect.top - containerRect.top) + (pizzaRect.height / 2);

    const movementLimit = (pizzaRect.width / 2) * 0.65;
    const diagonalLimit = movementLimit * 0.707;

    let mouseX = e.clientX - containerRect.left;
    let mouseY = e.clientY - containerRect.top;

    let targetTipX = pizzaCenterX;
    let targetTipY = pizzaCenterY;

    switch (activeSliceId) {
        case 1:
            targetTipX = pizzaCenterX;

            let projectedY_1 = mouseY + (BLADE_OFFSET_Y * 0.5);
            let dy_1 = projectedY_1 - pizzaCenterY;

            if (Math.abs(dy_1) > movementLimit) dy_1 = Math.sign(dy_1) * movementLimit;

            targetTipY = pizzaCenterY + dy_1;
            break;

        case 2:
            targetTipY = pizzaCenterY;

            let projectedX_2 = mouseX + (BLADE_OFFSET_X * 0.5);
            let dx_2 = projectedX_2 - pizzaCenterX;

            if (Math.abs(dx_2) > movementLimit) dx_2 = Math.sign(dx_2) * movementLimit;
            targetTipX = pizzaCenterX + dx_2;
            break;

        case 3:
            let projectedY_3 = mouseY + (BLADE_OFFSET_Y * 0.5);
            let dy_3 = projectedY_3 - pizzaCenterY;

            if (Math.abs(dy_3) > diagonalLimit) dy_3 = Math.sign(dy_3) * diagonalLimit;

            targetTipY = pizzaCenterY + dy_3;
            targetTipX = pizzaCenterX + dy_3;
            break;

        case 4:
            let projectedY_4 = mouseY + (BLADE_OFFSET_Y * 0.5);
            let dy_4 = projectedY_4 - pizzaCenterY;

            if (Math.abs(dy_4) > diagonalLimit) dy_4 = Math.sign(dy_4) * diagonalLimit;

            targetTipY = pizzaCenterY + dy_4;
            targetTipX = pizzaCenterX - dy_4;
            break;
    }

    const slicerHalfW = pizzaSlicer.offsetWidth / 2;
    const slicerHalfH = pizzaSlicer.offsetHeight / 2;

    const newLeft = targetTipX - BLADE_OFFSET_X - slicerHalfW;
    const newTop = targetTipY - BLADE_OFFSET_Y - slicerHalfH;

    pizzaSlicer.style.left = newLeft + 'px';
    pizzaSlicer.style.top = newTop + 'px';


    if (activeSliceId !== null) {
        const layer = document.getElementById(`cut-layer-${activeSliceId}`);
        if (layer) {
            const radius = pizzaRect.width / 2;
            const totalRange = radius * (0.9 + 0.45);

            let currentDistFromStart = 0;

            let currentDy = targetTipY - pizzaCenterY;
            let currentDx = targetTipX - pizzaCenterX;

            const startPoint = -(radius * 0.9);

            switch (activeSliceId) {
                case 1:
                case 3:
                case 4:
                    currentDistFromStart = currentDy - startPoint;
                    break;
                case 2:
                    currentDistFromStart = currentDx - startPoint;
                    break;
            }

            let progressPercent = currentDistFromStart / totalRange;

            progressPercent = Math.max(0, Math.min(1, progressPercent));

            if (progressPercent > currentMaxProgress) {
                currentMaxProgress = progressPercent;
            }

            layer.style.setProperty('--progress', `${currentMaxProgress * 100}%`);

        }
    }


    checkCuttingProgress(targetTipX, targetTipY, pizzaCenterX, pizzaCenterY);
});


document.addEventListener('mouseup', () => {
    if (isSlicerDragging) {
        isSlicerDragging = false;
        if (pizzaSlicer) pizzaSlicer.style.cursor = 'grab';

        if (activeSliceId !== null) {
            activeSliceId = null;
        }
    }
});

function checkCuttingProgress(tipX, tipY, centerX, centerY) {
    const dx = tipX - centerX;
    const dy = tipY - centerY;

    const pizzaImg = document.getElementById('pizza-full');
    const pizzaRect = pizzaImg.getBoundingClientRect();

    const limit = (pizzaRect.width / 2) * 0.45;

    let reachedEnd = false;

    switch (activeSliceId) {
        case 1:
            if (dy > limit) reachedEnd = true;
            break;

        case 2:
            if (dx > limit) reachedEnd = true;
            break;

        case 3:
            if (dy > limit) reachedEnd = true;
            break;

        case 4:
            if (dy > limit) reachedEnd = true;
            break;
    }

    if (reachedEnd) {
        completeCurrentCut();
    }

    if (debugPoint) {
        debugPoint.style.left = tipX + 'px';
        debugPoint.style.top = tipY + 'px';
    }
}

function completeCurrentCut() {
    if (cutStatus[activeSliceId]) return;

    const currentId = activeSliceId;
    cutStatus[currentId] = true;
    cutsCompleted++;

    const layer = document.getElementById(`cut-layer-${currentId}`);
    if (layer) {
        layer.style.setProperty('--progress', '100%');
    }

    if (typeof mgame4 !== 'undefined') {
        mgame4.currentTime = 0;
        mgame4.play();
    }

    isSlicerDragging = false;
    if (pizzaSlicer) pizzaSlicer.style.cursor = 'grab';

    if (cutsCompleted >= totalCutsNeeded) {
        finishPizzaGame(true);
    } else {
        currentSequenceIndex++;
        if (currentSequenceIndex < CUT_SEQUENCE.length) {
            activeSliceId = CUT_SEQUENCE[currentSequenceIndex];

            currentMaxProgress = 0;

            setTimeout(() => {
                positionSlicerForCurrentStep();
            }, 300);
        }
    }
}


// --- COFFEE CRAFT (LATTE ART) DEĞİŞKENLERİ ---
let isPotDragging = false;
let isCoffeeGameActive = false;
let potOffsetX = 0, potOffsetY = 0;

// YENİ SİSTEM: Maske dizisi yerine doluluk oranı (0 ile 100 arası)
let coffeeFillLevel = 0;

const coffeePot = document.getElementById('coffee-pot');
const coffeeFull = document.getElementById('coffee-full');
const coffeeCraft = document.querySelector('.coffee-craft');
const coffeeGroup = document.querySelector('.overlap-group7');
const coffeeDebugPoint = document.getElementById('coffee-debug-point');

// --- OYUNU SIFIRLA ---
function resetCoffeeCraft() {
    isCoffeeGameActive = true;
    isPotDragging = false;

    // Değişkeni sıfırla
    coffeeFillLevel = 0;

    // Görseli görünmez yap (Opacity 0)
    if (coffeeFull) {
        coffeeFull.style.opacity = '0';
        // Eski maske varsa temizle
        coffeeFull.style.webkitMaskImage = 'none';
        coffeeFull.style.maskImage = 'none';
    }

    if (coffeePot) {
        coffeePot.style.left = '20vw';
        coffeePot.style.top = '0vw';

        coffeePot.classList.remove('pouring');
        coffeePot.classList.remove('grabbed');
        coffeePot.style.cursor = 'grab';
    }

    if (coffeeDebugPoint) coffeeDebugPoint.style.display = 'none';

    // Paneli aç
    if (coffeeCraft) coffeeCraft.style.display = 'flex';
}

// --- POT TUTMA ---
if (coffeePot) {
    coffeePot.addEventListener('mousedown', (e) => {
        if (!isCoffeeGameActive) return;
        isPotDragging = true;
        coffeePot.style.cursor = 'grabbing';

        coffeePot.classList.add('grabbed');

        const rect = coffeePot.getBoundingClientRect();
        potOffsetX = e.clientX - rect.left;
        potOffsetY = e.clientY - rect.top;
        if (coffeeDebugPoint) coffeeDebugPoint.style.display = 'block';
    });
}

// --- HAREKET VE DOLDURMA ---
document.addEventListener('mousemove', (e) => {
    if (!isPotDragging || !isCoffeeGameActive || !coffeePot || !coffeeFull) return;

    const containerRect = coffeeGroup.getBoundingClientRect();
    const fullRect = coffeeFull.getBoundingClientRect();

    // 1. Pot Hareketi
    let newLeft = e.clientX - containerRect.left - potOffsetX;
    let newTop = e.clientY - containerRect.top - potOffsetY;

    coffeePot.style.left = newLeft + 'px';
    coffeePot.style.top = newTop + 'px';

    // 2. Dökme Ucu Ayarı (Sabit Piksel)
    const pixelOffsetX = 250;
    const pixelOffsetY = 100;

    const spoutX_Container = newLeft + pixelOffsetX;
    const spoutY_Container = newTop + pixelOffsetY;

    // Debug Noktası
    if (coffeeDebugPoint) {
        coffeeDebugPoint.style.left = spoutX_Container + 'px';
        coffeeDebugPoint.style.top = spoutY_Container + 'px';
    }

    // 3. Fincan Kontrolü
    const spoutX_Global = containerRect.left + spoutX_Container;
    const spoutY_Global = containerRect.top + spoutY_Container;

    const padding = fullRect.width * 0.15;
    const isInsideCup =
        spoutX_Global > fullRect.left + padding &&
        spoutX_Global < fullRect.right - padding &&
        spoutY_Global > fullRect.top + padding &&
        spoutY_Global < fullRect.bottom - padding;

    if (isInsideCup) {
        if (!coffeePot.classList.contains('pouring')) {
            coffeePot.classList.add('pouring');
        }

        // --- DOLDURMA MANTIĞI (OPACITY) ---

        // Her harekette doluluk oranını artır
        // Bu sayıyı artırırsan (örn: 0.8) daha hızlı biter, azaltırsan (0.2) daha zor biter.
        coffeeFillLevel += 0.4;

        if (coffeeFillLevel > 100) coffeeFillLevel = 100;

        // Opacity'yi güncelle (0.0 ile 1.0 arası)
        coffeeFull.style.opacity = (coffeeFillLevel / 100).toString();

        // Bitiş Kontrolü
        if (coffeeFillLevel >= 100) {
            finishCoffeeGame(true);
        }

    } else {
        coffeePot.classList.remove('pouring');
    }
});

// --- BIRAKMA ---
document.addEventListener('mouseup', () => {
    if (isPotDragging) {
        isPotDragging = false;
        if (coffeePot) {
            coffeePot.style.cursor = 'grab';
            coffeePot.classList.remove('pouring');
            coffeePot.classList.remove('grabbed');
        }
        if (coffeeDebugPoint) coffeeDebugPoint.style.display = 'none';
    }
});

// --- BİTİŞ ---
function finishCoffeeGame(success) {
    isCoffeeGameActive = false;
    isPotDragging = false;

    if (coffeePot) {
        coffeePot.classList.remove('pouring');
        coffeePot.classList.remove('grabbed');
    }
    if (coffeeDebugPoint) coffeeDebugPoint.style.display = 'none';

    if (typeof soundCorrect !== 'undefined') soundCorrect.play();

    setTimeout(() => {
        const coffeeCraft = document.querySelector('.coffee-craft');
        if (coffeeCraft) coffeeCraft.style.display = 'none';

        if (typeof closeAllMiniGames === 'function') closeAllMiniGames();

        if (success) {
            // Başarılı olunca tam görünür yap
            if (coffeeFull) {
                coffeeFull.style.opacity = '1';
            }

            const resourceName = window.GetParentResourceName ? window.GetParentResourceName() : "test-resource";
            fetch(`https://${resourceName}/completeCraft`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    itemname: typeof currentItemName !== 'undefined' ? currentItemName : 'coffee',
                    count: typeof currentCount !== 'undefined' ? currentCount : 1
                })
            })
                .then(res => res.json())
                .then(data => {
                    const msg = (typeof locales !== 'undefined' && locales[currentLocale]?.give_item_success) ? locales[currentLocale].give_item_success : "Başarılı!";
                    if (typeof showNotification === 'function') showNotification(msg);
                });
        }
    }, 1000);
}

function resetCakeCraft() {
    mergedPiecesCount = 0;
    draggingPiece = null;
    currentFullCakeOpacity = 0;

    fullCake.style.display = 'none';
    fullCake.style.opacity = 0;

    document.querySelectorAll('.cake-craft-item.small').forEach(item => {
        item.classList.remove('used');
        item.style.display = 'block';
        item.style.left = '0px';
        item.style.top = '0px';
        item.style.cursor = 'grab';
        overlapGroup2.appendChild(item);
    });

    dessertCraft.style.display = 'flex';
}

function addEventListenerToSpoon(spoon) {
    spoon.addEventListener('mousedown', e => {
        if (currentSpoon === null) {
            currentSpoon = spoon;
            const rect = spoon.getBoundingClientRect();
            spoonOffsetX = e.clientX - rect.left;
            spoonOffsetY = e.clientY - rect.top;

            spoon.style.zIndex = 1000;
            spoon.style.cursor = 'grabbing';

            lastMouseX = e.clientX;
            lastMouseY = e.clientY;

            if (!isMixing) {
                isMixing = true;
                mixingInterval = setInterval(() => {
                    mixingTime += 100;
                    if (mgame3.paused) {
                        mgame3.pause();
                        mgame3.currentTime = 0;
                        mgame3.play();
                    }

                    if (mixingTime >= REQUIRED_MIXING_TIME) {
                        mgame3.pause();
                        mgame3.currentTime = 0;
                        finishMixingGame();
                    }
                }, 100);
            }
        }
    });
}

function resetFoodCraft() {
    mixingTime = 0;
    isMixing = false;
    currentSpoon = null;

    const oldSpoon = document.getElementById('food-spoon');
    if (oldSpoon) {
        oldSpoon.remove();
    }

    const newSpoon = document.createElement('img');
    newSpoon.src = 'assets/images/food-spoon.png';
    newSpoon.id = 'food-spoon';
    newSpoon.style.position = 'absolute';
    newSpoon.style.width = '175px';
    newSpoon.style.height = '175px';
    newSpoon.style.left = '10px';
    newSpoon.style.left = '10px';
    newSpoon.style.top = '10px';
    newSpoon.style.cursor = 'grab';
    newSpoon.draggable = false;

    addEventListenerToSpoon(newSpoon);
    panContainer.appendChild(newSpoon);

    foodCraft.style.display = 'flex';
}

function resetSandwichCraft() {
    currentSandwichItem = null;
    sandwichItemIndex = 0;
    isSandwichFalling = false;
    sandwichSwingDirection = 1;
    sandwichSwingPosition = 0;
    sandwichStackedItems = 0;
    baseStackLeft = 0;

    if (sandwichSwingInterval) clearInterval(sandwichSwingInterval);

    sandwichIngredients.forEach(ingredient => {
        const item = document.getElementById(ingredient.id);
        if (item) {
            item.style.display = 'none';
            item.style.top = '0px';
            item.style.left = '0px';
        }
    });

    const firstIngredient = sandwichIngredients[0];
    currentSandwichItem = document.getElementById(firstIngredient.id);

    if (currentSandwichItem) {
        currentSandwichItem.style.display = 'block';
        currentSandwichItem.style.top = '0px';
        startSandwichSwing();
    }

    sandwichCraft.style.display = 'flex';
}

function resetShakeCraft() {
    shakeProgress = 0;
    isShakeDragging = false;

    const sEmpty = document.getElementById('shake-empty');
    const sCream = document.getElementById('shake-cream');
    const sFull = document.getElementById('shake-full');
    const sPanel = document.querySelector('.shake-craft');

    if (sEmpty) sEmpty.style.display = 'block';
    if (sFull) sFull.style.display = 'none';

    if (sCream) {
        sCream.style.display = 'block';
        sCream.style.cursor = 'grab';


        sCream.style.left = '';
        sCream.style.top = '';
    }

    if (sPanel) sPanel.style.display = 'flex';
}




function tryStartMiniGame(itemname, category) {
    fetch(`https://${GetParentResourceName()}/checkItemUsable`, {
        method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({
            itemname: itemname, count: currentCount
        })
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                openMiniGame(category);
                maincraft.style.display = "none";
            } else {
                soundWrong.pause();
                soundWrong.currentTime = 0;
                soundWrong.play()
                showNotification(locales[currentLocale].craft_fail_no_ingredients);
            }
        })
        .catch(err => {
            soundWrong.pause();
            soundWrong.currentTime = 0;
            soundWrong.play()
            showNotification(locales[currentLocale].craft_fail_request_error);
        });
}

function openMiniGame(type) {
    closeAllMiniGames();

    if (type === 'drinks') {
        resetDrinkCraft();
    } else if (type === 'desserts') {
        resetCakeCraft();
    } else if (type === 'foods') {
        resetFoodCraft();
    } else if (type === 'sandwich') {
        resetSandwichCraft();
    } else if (type === 'shake') {
        resetShakeCraft()
    } else if (type === 'pizza') {
        resetPizzaCraft();
    } else if (type === 'coffee') {
        resetCoffeeCraft();
    }
}

function closeAllMiniGames() {
    drinkCraft.style.display = 'none';
    dessertCraft.style.display = 'none';
    foodCraft.style.display = 'none';
    if (sandwichCraft) sandwichCraft.style.display = 'none';

    if (sandwichSwingInterval) {
        clearInterval(sandwichSwingInterval);
    }
    shakeCraft.style.display = 'none';
    pizzaCraft.style.display = 'none';
    coffeeCraft.style.display = 'none';
    maincraft.style.display = 'block';
}

window.addEventListener("message", (event) => {
    const data = event.data;

    if (data.type === "showmenu") {
        maxItemCount = data.maxItemCount
        if (data.show) {
            const steamHexID = hexToSteamID(data.steamhex);
            fetchSteamProfileImage(steamHexID)
                .then(profileImage => {

                    const playername = document.querySelector(".player-name");
                    if (playername) playername.textContent = data.playername;

                    const job = document.querySelector(".player-job");
                    if (job) job.textContent = data.job;

                    const profils = document.querySelectorAll('.player-photo');

                    profils.forEach(element => {
                        element.src = profileImage;
                    });
                });
            maincraft.style.display = 'block';
            popUp.pause();
            popUp.currentTime = 0;
            popUp.play()
        } else {
            popUpr.pause();
            popUpr.currentTime = 0;
            popUpr.play()
            maincraft.style.display = 'none';
        }
    }

    if (data.type === "updatecraft") {
        switchLocale(data.locale)
        craftItems = data.items;
        renderCraftItems(data.items);
    }

});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {

        const baseCraftMenu = document.querySelector(".craft");
        if (baseCraftMenu && baseCraftMenu.style.display !== "none") {
            baseCraftMenu.style.display = "none";
            fetch(`https://${GetParentResourceName()}/ExitButton`, {
                method: 'POST', headers: {
                    'Content-Type': 'application/json'
                }, body: JSON.stringify({})
            });
        }

        const craftMenuOverlay = document.querySelector(".craft-menu-overlay");
        if (craftMenuOverlay && craftMenuOverlay.style.display !== "none") {
            craftMenuOverlay.style.display = "none";
            fetch(`https://${GetParentResourceName()}/ExitButton`, {
                method: 'POST', headers: {
                    'Content-Type': 'application/json'
                }, body: JSON.stringify({})
            });
        }

        const drinkCraft = document.querySelector(".drink-craft");
        if (drinkCraft && drinkCraft.style.display !== "none") {
            drinkCraft.style.display = "none";
            fetch(`https://${GetParentResourceName()}/ExitButton`, {
                method: 'POST', headers: {
                    'Content-Type': 'application/json'
                }, body: JSON.stringify({})
            });
        }

        const dessertCraft = document.querySelector(".dessert-craft");
        if (dessertCraft && dessertCraft.style.display !== "none") {
            dessertCraft.style.display = "none";
            fetch(`https://${GetParentResourceName()}/ExitButton`, {
                method: 'POST', headers: {
                    'Content-Type': 'application/json'
                }, body: JSON.stringify({})
            });
        }

        const foodCraft = document.querySelector(".food-craft");
        if (foodCraft && foodCraft.style.display !== "none") {
            foodCraft.style.display = "none";
            fetch(`https://${GetParentResourceName()}/ExitButton`, {
                method: 'POST', headers: {
                    'Content-Type': 'application/json'
                }, body: JSON.stringify({})
            });
        }

        const sandwichCraftEsc = document.querySelector(".sandwich-craft");
        if (sandwichCraftEsc && sandwichCraftEsc.style.display !== "none") {
            sandwichCraftEsc.style.display = "none";

            if (sandwichSwingInterval) {
                clearInterval(sandwichSwingInterval);
                sandwichSwingInterval = null;
            }

            fetch(`https://${GetParentResourceName()}/ExitButton`, {
                method: 'POST', headers: {
                    'Content-Type': 'application/json'
                }, body: JSON.stringify({})
            });
        }

        const pizzaCraftEsc = document.querySelector(".pizza-craft");
        if (pizzaCraftEsc && pizzaCraftEsc.style.display !== "none") {
            pizzaCraftEsc.style.display = "none";

            isSlicerDragging = false;
            if (typeof pizzaSlicer !== 'undefined') pizzaSlicer.style.cursor = 'grab';

            fetch(`https://${GetParentResourceName()}/ExitButton`, {
                method: 'POST', headers: {
                    'Content-Type': 'application/json'
                }, body: JSON.stringify({})
            });
        }

        const coffeeCraftEsc = document.querySelector(".coffee-craft");
        if (coffeeCraftEsc && coffeeCraftEsc.style.display !== "none") {
            coffeeCraftEsc.style.display = "none";

            isCoffeeGameActive = false;
            isPotDragging = false;
            if (typeof coffeePot !== 'undefined') {
                coffeePot.style.cursor = 'grab';
                coffeePot.classList.remove('pouring');
            }

            fetch(`https://${GetParentResourceName()}/ExitButton`, {
                method: 'POST', headers: {
                    'Content-Type': 'application/json'
                }, body: JSON.stringify({})
            });
        }

    }
});