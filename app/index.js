const yargs = require("yargs");
const {
  Read_All_Product,
  Create_new_product,
  delete_Product,
  update_Product,
} = require("./model/Task");

// Đọc tất cả sản phẩm từ file: node app/index.js readAll
yargs.command({
  command: "readAll",
  handler: () => {
    const read = Read_All_Product();
    console.log(read);
  },
});

// Tạo sản phẩm: node app/index.js create --id="4" --name="iphone" --price="1000.5$" --amount="50" --desc="New version"
yargs.command({
  command: "create",
  builder: {
    id: { type: "string" },
    name: { type: "string" },
    price: { type: "string" },
    amount: { type: "number" },
    desc: { type: yargs.string },
  },
  handler: (args) => {
    const { id, name, price, amount, desc } = args;
    const create = Create_new_product(id, name, price, amount, desc);
    console.log("create succeed: ", create);
  },
});

// Xóa sản phẩm: node app/index.js delete --id="1"
yargs.command({
  command: "delete",
  builder: {
    id: {
      type: "string",
    },
  },
  handler: (args) => {
    const { id } = args;
    const delete_ = delete_Product(id); // gán vào biến nếu hàm phải trả về 1 giá trị cụ thể
    if (delete_) {
      console.log("delete suceed: ", delete_);
    } else {
      console.log("not found!!!");
    }
  },
});

//Sửa sp: node app/index.js update --id="1" --name="laptop" --price="2000$" --amount="250" --desc="dell inspirance"
yargs.command({
  command: "update",
  builder: {
    id: { type: "string" },
    name: { type: "string" },
    price: { type: "string" },
    amount: { type: "number" },
    desc: { type: "string" },
  },
  handler: (args) => {
    const { id, name, price, amount, desc } = args;
    const update = update_Product(id, name, price, amount, desc);
    if (update) {
      console.log("update successful: ", update);
    } else {
      console.log("not found!!!");
    }
  },
});
// lưu lại yargs vừa tạo
yargs.parse();
