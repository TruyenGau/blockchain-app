pragma solidity ^0.8.0;

contract Dappazon {
    struct Item {
        uint256 id;
        string name;
        string category;
        string image;
        uint256 price;
        uint256 rating;
        uint256 stock;
        address seller; // Thông tin người bán
    }

    mapping(uint256 => Item) public items;
    uint256 public itemCount;

    event ProductAdded(uint256 id, string name, address seller);
    event Buy(address buyer, uint256 itemId, uint256 quantity);
    event PaymentReceived(address seller, uint256 amount); // Sự kiện mới để ghi nhận giao dịch nhận tiền

    // Thêm sản phẩm
    function addProduct(
        string memory _name,
        string memory _category,
        string memory _image,
        uint256 _price,
        uint256 _rating,
        uint256 _stock
    ) public {
        itemCount++;
        items[itemCount] = Item(
            itemCount,
            _name,
            _category,
            _image,
            _price,
            _rating,
            _stock,
            msg.sender // Lưu địa chỉ người bán
        );

        emit ProductAdded(itemCount, _name, msg.sender);
    }

    // Mua sản phẩm
    function buy(uint256 _itemId, uint256 _quantity) public payable {
        Item storage item = items[_itemId];
        require(item.stock >= _quantity, "Not enough stock");
        require(msg.value == item.price * _quantity, "Incorrect payment");

        // Chuyển tiền cho người bán
        payable(item.seller).transfer(msg.value);

        // Phát sự kiện ghi nhận giao dịch nhận tiền
        emit PaymentReceived(item.seller, msg.value);

        // Giảm số lượng tồn kho
        item.stock -= _quantity;

        emit Buy(msg.sender, _itemId, _quantity);
    }
}
