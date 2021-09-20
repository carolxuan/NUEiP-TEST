let data = [
  {
    "name": "邱小甘",
    "englishName": "Peter",
    "gender": "男",
    "phone": "0918882734",
    "email": "ass3@gmail.com"
  },
  {
    "name": "蔡凡昕",
    "englishName": "Allen",
    "gender": "男",
    "phone": "0918882334",
    "email": "vcvv000@gmail.com"
  },
  {
    "name": "趙雪瑜",
    "englishName": "Sharon",
    "gender": "女",
    "phone": "0919664210",
    "email": "Sharon123@gmail.com"
  },
  {
    "name": "賴佳蓉",
    "englishName": "Yoki",
    "gender": "女",
    "phone": "0988654888",
    "email": "Yoki123@gmail.com"
  }
]

// 初始化
function init() {
  renderList(data)
}
init()

// 渲染列表
function renderList(data) {
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
              <td><button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal" data-num="deleteItem">刪除</button></td>
            </tr>`
  }
  tbodyWrap.innerHTML = list
}

// 欄位驗證
;(function () {
  'use strict'
  var forms = document.querySelectorAll('.needs-validation')
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
// ;(function() {
//   const tbodyWrap = document.querySelector('.tbody-wrap')
//   tbodyWrap.addEventListener('click', (e) => {
//     if(e.target.getAttribute('data-num') === 'deleteItem') {
//       let num = e.target.dataset.num
//       data.splice(num, 1)
//     }
//     renderList(data)
//   })
// })();
