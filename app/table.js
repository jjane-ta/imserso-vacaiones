console.log("table script load")
	var data = []

  const filterIds = []
  const table = document.getElementById("table")
  var body = table.createTBody()

function initTable(newData) {
  data = newData
  const filtersRow = table.createTHead().insertRow(-1)
    filtersRow.setAttribute('class', 'table_filter_row')

  const headerRow = table.createTHead().insertRow(-1)
    headerRow.setAttribute('class', 'table_header_row')

  //headers && filters
  Object.keys(data[0]).forEach((key) => {
    const cell_filter = filtersRow.insertCell(-1)
    cell_filter.appendChild(makeFilter(key))
    const cell_header = headerRow.insertCell(-1)
    cell_header.setAttribute('class','table_header_cell')
    cell_header.innerHTML = key;
  } )

  table.createTBody()
  fillTable()
}

function makeFilter(key){
  const id = 'filter_' + key
  const el = document.createElement('DIV')
    el. setAttribute('class','filter_div')

  const filterHeader = document.createElement('INPUT')
    filterHeader.setAttribute('class','filter_input')
    filterHeader.setAttribute('type','text')
    filterHeader.setAttribute('id',id)
    filterHeader.setAttribute('onkeyup',"fillTable()")
    filterHeader.setAttribute('placeholder','Filtrar por '+ key)

  const cross = document.createElement('BUTTON')
    cross.setAttribute('class','filter_button')
    cross.setAttribute('type','button')
    cross.setAttribute('onclick',"document.getElementById('"+ id +"').value = ''; fillTable()")
    cross.innerHTML = 'X'

  el.appendChild(cross)

  el.appendChild(filterHeader)
  
  filterIds.push(id)
  return el
}

function fillTable(){

  body.remove()
  body = table.createTBody()
  const filtered_data = filterData()
  filtered_data.forEach((item) => {
    var row = body.insertRow(-1);
    row.setAttribute('class','table_row')
    Object.values(item).forEach((value) => {
      const cell = row.insertCell(-1)
      cell.setAttribute('class','table_cell')
      cell.innerHTML = value;
    })
  })
}

function filterData(){
  var filtered_data = data
  filterIds.forEach((id, i) => {
    const filter_value = document.getElementById(id).value.toLowerCase() 
    if (filter_value.length !== 0) filtered_data = filtered_data.filter((item) => {
      const value = Object.values(item)[i].toLowerCase() 
      return value.includes(filter_value)
    })
  })
  return filtered_data
}

function test(){
  filterIds.forEach((id) => 
  console.log(document.getElementById(id).value))
}