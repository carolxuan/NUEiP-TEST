// 套件
AOS.init()

// loading
const load = document.querySelector('.loading-icon')
function loading(status) {
  const loading = load.classList.toggle('d-none')
  status === 'run' ? loading : loading
}

// 取得 data
let data = []
function getData() {
  loading('run')
  // const url = 'https://mocki.io/v1/ee43aff6-1a09-43db-8591-3d0b7721d6d7'
  const url = 'https://randomuser.me/api/?results=10'
  axios.get(url)
    .then(res => {
      data = res.data.results
      console.log(data)
      renderList()
      loading()
    })
    .catch(err => {
      console.log(err);
    })
}
getData()

// 渲染列表
function renderList() {
  const tbodyWrap = document.querySelector('.tbody-wrap')
  let list = ''
  for(let i=0; i<data.length; i++) {
    list += `<tr>
              <td>
                <span data-bs-toggle="tooltip" class="tooltipTxt" data-bs-placement="top" 
                title="${`[${data[i].gender}]`} ${data[i].name.first}">${data[i].name.first} ${data[i].name.last}</span>
              </td>
              <td>${data[i].gender}</td>
              <td><a href="#" data-bs-toggle="popover" data-bs-content="聯絡方式：${data[i].phone.substring(0, 4) + "-" + data[i].phone.substring(4, 7) + "-" + data[i].phone.substring(7, 10)}">${data[i].phone}</a></td>
              <td>${data[i].email}</td>
              <td><button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#editModal">修改</button></td>
              <td><button type="button" class="btn btn-danger deleteItem" data-num=${i}
              data-action="deleteItem"
              >刪除</button></td>
            </tr>`
  }
  tbodyWrap.innerHTML = list
  let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  let tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
  })
  let popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
  let popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl)
  })
}

// 欄位驗證
;(function () {
  'use strict'
  let forms = document.querySelectorAll('.needs-validation')
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
        form.classList.add('was-validated')
      }, false)
    })
    $("#myForm input").val()
})();

// 重新填寫、取消
;(function() {
  const btnArea = document.querySelectorAll('.groupBtn')
  btnArea.forEach(btnAreaItem => {
    btnAreaItem.addEventListener('click', (e) => {
      const input = document.querySelectorAll('input[type=text], input[type=email], input[type=tel], input[type=radio]')
      let targetBtn = e.target.getAttribute('data-action')
      input.forEach(item => {
        if (targetBtn === 'cancelBtn' || targetBtn === 'resetBtn') {
          item.value = ''
          item.checked = false
        }
      })
    })
  })
})();

// 刪除列表
let deleteNum = -1
;(function() {
  const tbodyWrap = document.querySelector('.tbody-wrap')
  tbodyWrap.addEventListener('click', (e) => {
    if(e.target.getAttribute('data-action') === 'deleteItem') {
      deleteNum = parseInt(e.target.dataset.num,10);
      $('#deleteModal').modal('show')
    }
  })
})();

;(function() {
  const deleteModal = document.querySelector('.deleteModal')
  deleteModal.addEventListener('click', (e) => {
    data.splice(deleteNum, 1)
    renderList()
  })
})();
