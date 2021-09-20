// 取得 data
let data = []
function getData() {
  const url = 'https://mocki.io/v1/ee43aff6-1a09-43db-8591-3d0b7721d6d7'
  axios.get(url)
    .then(res => {
      data = res.data
      renderList()
    })
    .catch(err => {
      console.log(err);
    })
}

// 初始化
function init() {
  getData()
}
init()

// 渲染列表
function renderList() {
  const tbodyWrap = document.querySelector('.tbody-wrap')
  let list = '' 
  for(let i=0; i<data.length; i++) {
    list += `<tr>
              <td>${data[i].name}</td>
              <td>${data[i].englishName}</td>
              <td>${data[i].gender}</td>
              <td>${data[i].phone}</td>
              <td>${data[i].email}</td>
              <td><button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#editModal">修改</button></td>
              <td><button type="button" class="btn btn-danger deleteItem" data-num=${i}
              data-action="deleteItem"
              >刪除</button></td>
            </tr>`
  }
  tbodyWrap.innerHTML = list
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
