// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Private } from '@redwoodjs/router'

const Routes = () => {
  return (
    <Router>
      <Route path="/" page={HomePage} name="home" />
      <Private unauthenticated="home">
        <Route path="/admin/feeds/new" page={NewFeedPage} name="newFeed" />
        <Route path="/admin/feeds/{id:Int}/edit" page={EditFeedPage} name="editFeed" />
        <Route path="/admin/feeds/{id:Int}" page={FeedPage} name="feed" />
        <Route path="/admin/feeds" page={FeedsPage} name="feeds" />
        <Route path="/admin/item-links/new" page={NewItemLinkPage} name="newItemLink" />
        <Route path="/admin/item-links/{id:Int}/edit" page={EditItemLinkPage} name="editItemLink" />
        <Route path="/admin/item-links/{id:Int}" page={ItemLinkPage} name="itemLink" />
        <Route path="/admin/item-links" page={ItemLinksPage} name="itemLinks" />
      </Private>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
