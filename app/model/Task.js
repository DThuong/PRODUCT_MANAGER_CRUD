const fs = require("fs");

// Lấy dữ liệu sản phẩm từ việc đọc file
const Read_All_Product = () => {
  const list = fs.readFileSync("task.json");
  const string = list.toString();
  const arr = JSON.parse(string);
  return arr;
};
// Thêm sản phẩm
const Create_new_product = (id, name, price, amount, desc) => {
  const new_Product = {
    id,
    name,
    price,
    amount,
    desc,
  };
  const list_product = Read_All_Product();
  const add = [...list_product, new_Product];
  fs.writeFileSync("task.json", JSON.stringify(add));
  return new_Product;
};
// xóa sản phẩm
const delete_Product = (id) => {
  let list_product = Read_All_Product(); // Đảm bảo hàm Read_All_Product đã được định nghĩa ở nơi khác
  const index = list_product.findIndex((item) => item.id === id);
  if (index !== -1) {
    const id_delete = list_product.splice(index, 1); // Sử dụng splice để xóa sản phẩm khỏi danh sách
    fs.writeFileSync("task.json", JSON.stringify(list_product));
    return id_delete;
  } else {
    return false;
  }
};
// sửa sản phẩm
const update_Product = (id, name, price, amount, desc) => {
  const list = Read_All_Product(); // lấy mảng danh sách sản phẩm
  const index = list.findIndex((item) => item.id === id); // tìm vị trí sản phẩm cần update: không tìm được trả về -1
  if (index !== -1) {
    const org = list[index];
    // Cập nhật thông tin sản phẩm.
    org.name = name;
    org.price = price;
    org.amount = amount;
    org.desc = desc;

    fs.writeFileSync("task.json", JSON.stringify(list, null, 2)); // lưu file
    return org;
  } else {
    return false;
  }
};

module.exports = {
  Read_All_Product,
  Create_new_product,
  delete_Product,
  update_Product,
};
