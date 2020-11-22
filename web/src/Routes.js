// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route } from '@redwoodjs/router'

const Routes = () => {
  return (
    <Router>
      <Route path="/" page={HomePage} name="home" />
      <Route path="/item-links/new" page={NewItemLinkPage} name="newItemLink" />
      <Route path="/item-links/{id:Int}/edit" page={EditItemLinkPage} name="editItemLink" />
      <Route path="/item-links/{id:Int}" page={ItemLinkPage} name="itemLink" />
      <Route path="/item-links" page={ItemLinksPage} name="itemLinks" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
