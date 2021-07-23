function convertXMLTable(element){
  let urls = [];
  let tr = element.querySelectorAll('tr');
  for(let i = 0; i < tr.length; i++){
    let tag = tr[i];
      urls.push(tag.querySelector('tr td a').href);
  }
  return urls;
}
