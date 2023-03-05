import { toggleHideClasses } from "./helpers.js";
import Category from "./category.js";
import Bookmark from "./bookmark.js";
import Form from "./form.js";
import {
  btnShowFormCrateCategory,
  btnCreateCategory,
  formCreateCategory,
  sectionCategories,
  sectionBookmarks,
  btnShowFormCrateBookmark,
  formCreateBookmark,
  btnCreateBookmark,
  btnBack,
  appState,
} from "./constants.js";

const state = appState.getState();

function createBookmark(name, link) {
  return new Bookmark({ name, link });
}

function createCategory(props) {
  return new Category(props);
}

function createForm(props) {
  return new Form(props);
}

state.bookmarks.forEach((el) => {
  const category = createCategory(el);
  category.createElement(el);
});

const handleCreateCategory = () => {
  const form = createForm(formCreateCategory);
  const { name } = form.getValues();
  const category = createCategory({ name });
  const categoryInfo = category.getInfo();

  category.createElement(categoryInfo);
  appState.addToState(categoryInfo);
  toggleHideClasses(formCreateCategory);
};

const handleCreateBookmark = () => {
  const form = createForm(formCreateBookmark);
  const { name, link } = form.getValues();
  const opendCategory = state.opendCategory;

  const bookmark = createBookmark(name, link);
  const infoBookmark = bookmark.getInfo();
  bookmark.createElement();

  const category = {
    ...opendCategory,
    values: opendCategory.values.length
      ? [...opendCategory.values, infoBookmark]
      : [infoBookmark],
  };

  appState.updateStateCategory(category);
  toggleHideClasses(formCreateBookmark);
};

const handleBack = () => {
  state.handeleCloseCategory();
  toggleHideClasses(sectionCategories, sectionBookmarks);
};

btnShowFormCrateCategory.addEventListener("click", () =>
  toggleHideClasses(formCreateCategory)
);
btnShowFormCrateBookmark.addEventListener("click", () =>
  toggleHideClasses(formCreateBookmark)
);
btnCreateBookmark.addEventListener("click", handleCreateBookmark);
btnCreateCategory.addEventListener("click", handleCreateCategory);
btnBack.addEventListener("click", handleBack);
