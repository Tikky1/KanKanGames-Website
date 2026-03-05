let currentLocale = 'en';

const locales = {
  en: {
    welcome_text: 'Welcome',
    nav_all: 'All',
    nav_foods: 'Foods',
    nav_desserts: 'Desserts',
    nav_drinks: 'Drinks',
    nav_exit: 'Exit',
    product_list_title: 'Product List',
    search_placeholder: 'Search...',
    craft_item_name: 'Coffee',
    craft_button_text: 'Craft',
    notification_message: 'Your notification message will appear here',
    give_item_success: 'SUCCESS: Item has been given successfully!',
    give_item_fail: 'FAILURE: An error occurred while giving the item.',
    give_item_fail_with_error: 'FAILURE: An error occurred while giving the item. Error: ',
    craft_fail_no_ingredients: 'FAILURE: You do not have the required materials to craft this item.',
    craft_fail_request_error: 'FAILURE: Failed to send data.',
    max_item_count_warning: 'You have reached the maximum limit per attempt.',
  },
  tr: {
    welcome_text: 'Hoşgeldin',
    nav_all: 'Hepsi',
    nav_foods: 'Yemekler',
    nav_desserts: 'Tatlılar',
    nav_drinks: 'İçecekler',
    nav_exit: 'Çıkış',
    product_list_title: 'Ürün Listesi',
    search_placeholder: 'Ara...',
    craft_item_name: 'Kahve',
    craft_button_text: 'Üret',
    notification_message: 'Bildirim mesajınız burada olacak',
    give_item_success: 'BAŞARILI: Eşya başarıyla verildi!',
    give_item_fail: 'BAŞARISIZ: Eşya verilirken bir sorun oluştu.',
    give_item_fail_with_error: 'BAŞARISIZ: Eşya verilirken bir sorun oluştu. Hata: ',
    craft_fail_no_ingredients: 'BAŞARISIZ: Bu eşyayı üretmek için gerekli malzemelere sahip değilsiniz.',
    craft_fail_request_error: 'BAŞARISIZ: Veri gönderilemedi.',
    max_item_count_warning: 'Tek seferdeki maksimum limite ulaştınız.',
  }
};

function switchLocale(locale) {
  if (locales[locale]) {
    currentLocale = locale;
    localizeText();
  }
}

function localizeText() {
  const elements = document.querySelectorAll('[data-localize]');
  elements.forEach(element => {
    const key = element.getAttribute('data-localize');
    const text = locales[currentLocale][key];
    if (!text) return;
    element.textContent = text;
  });

  const placeholders = document.querySelectorAll('[data-localize-placeholder]');
  placeholders.forEach(element => {
    const key = element.getAttribute('data-localize-placeholder');
    const text = locales[currentLocale][key];
    if (!text) return;
    element.placeholder = text;
  });
}

document.addEventListener('DOMContentLoaded', localizeText);

export { locales, currentLocale, switchLocale };
