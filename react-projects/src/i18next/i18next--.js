import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      OS: "Omar Sherif El Dakhakhny",
      notes: "Notes",
      by: "by",
      searchPlaceholder: "Search...",
      add: "Add",
      save: "Save",
      edit: "Edit",
      remove: "Remove",
      all: "All",
      pending: "Pending",
      completed: "Completed",
      selectPriority: "Select Priority",
      noSorting: "No Sorting",
      az: "Alphabetically (A-Z)",
      highToLow: "High to Low Priority",
      lowToHigh: "Low to High Priority",
      pleaseEnter: "Please enter a valid item and select a priority.",
      empty: "Empty",
      priority: "Priority",
      high: "High", 
      mid: "Midium",
      low: "Low",
      todoadder: "Add a ToDo",
      no: "None",
      oldest: "Oldest",
      newest: "Newest"
    },
  },
  ar: {
    translation: {
      OS: "عمر شريف الدخاخني",
      notes: "لائحة",
      by: "المصمم",
      searchPlaceholder: "بحث...",
      add: "إضافة",
      save: "حفظ",
      edit: "تعديل",
      remove: "حذف",
      all: "الكل",
      pending: "معلق",
      completed: "مكتمل",
      selectPriority: "اختر الأولوية",
      noSorting: "بدون ترتيب",
      az: "ترتيب أبجدي (أ-ي)",
      highToLow: "مرتفع إلى منخفض",
      lowToHigh: "منخفض إلى مرتفع",
      pleaseEnter: "الرجاء إدخال عنصر صالح وتحديد الأولوية.",
      empty: "خالي",
      priority: "اولوية",
      high: "عالية", 
      mid: "متوسطة",
      low: "منخفضة",
      todoadder: "اضف ما تريد ان تفعل",
      no: "لا شيء",
      oldest: "الاقدم",
      newest: "الاجدد"
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;