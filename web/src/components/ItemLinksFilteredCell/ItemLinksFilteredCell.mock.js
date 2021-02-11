// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({

  allItems: [
    {
      "__typename":
      "ItemLink",
      "id":12402,
      "updated":"2019-10-08T21:29:49.000Z",
      "created":"2019-10-08T21:29:49.000Z",
      "url":"https://community.servicenow.com/community?id=community_article&sys_id=7e55be7adb94cc140be6a345ca961957",
      "author":"hrng",
      "title":"Scheduled tests through the magic of headless Chrome",
      "rendered":0,
      "clicked":0,
      "contentType":
      "text"
    }, {
      "__typename":
      "ItemLink",
      "id": 17760,
      "updated": "2020-10-11T07:15:09.001Z",
      "created": "2020-10-11T07:15:09.001Z",
      "url": "https://www.youtube.com/watch?v=qNjDcBpF7HI",
      "author": "Phil Swann",
      "title": "CLIP EDITED: ServiceNow GRC/IRM: Full Flow - Attestation/Indicator Issues vs Control Test Issues",
      "rendered": 0,
      "clicked": 0,
      "contentType": "text"
    }
  ],
  /**
   *   let rows = allItems.map((item, index) => (
    <tr key={item.id} scope="row">
      <td><time>{item.created.split('T')[0]}</time></td>
      <td><a href={item.url}>{item.title}</a></td>
      <td><ItemLinkElement element="author" item={item}></ItemLinkElement></td>
    </tr>
  ))
   */
})
