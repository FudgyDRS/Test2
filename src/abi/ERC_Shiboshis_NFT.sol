// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

abstract contract Context {
    function _msgSender() internal view virtual returns (address payable) { return payable(msg.sender); }
    function _msgData() internal view virtual returns (bytes memory) {
        this;
        return msg.data;
        }
    }
interface IERC165 {
    function supportsInterface(bytes4 interfaceId) external view returns (bool);
    }
interface IERC721 is IERC165 {
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);
    event ApprovalForAll(address indexed owner, address indexed operator, bool approved);

    function balanceOf(address owner) external view returns (uint256 balance);
    function ownerOf(uint256 tokenId) external view returns (address owner);
    function safeTransferFrom(address from, address to, uint256 tokenId) external;
    function transferFrom(address from, address to, uint256 tokenId) external;
    function approve(address to, uint256 tokenId) external;
    function getApproved(uint256 tokenId) external view returns (address operator);
    function setApprovalForAll(address operator, bool _approved) external;
    function isApprovedForAll(address owner, address operator) external view returns (bool);
    function safeTransferFrom(address from, address to, uint256 tokenId, bytes calldata data) external;
    }
interface IERC721Metadata is IERC721 {
    function name() external view returns (string memory);
    function symbol() external view returns (string memory);
    function tokenURI(uint256 tokenId) external view returns (string memory);
    }
interface IERC721Enumerable is IERC721 {
    function totalSupply() external view returns (uint256);
    function tokenOfOwnerByIndex(address owner, uint256 index) external view returns (uint256 tokenId);
    function tokenByIndex(uint256 index) external view returns (uint256);
    }
interface IERC721Receiver {
    function onERC721Received(address operator, address from, uint256 tokenId, bytes calldata data) external returns (bytes4);
    }
abstract contract ERC165 is IERC165 {
    bytes4 private constant _INTERFACE_ID_ERC165 = 0x01ffc9a7;

    mapping(bytes4 => bool) private _supportedInterfaces;

    constructor () {
        // Derived contracts need only register support for their own interfaces,
        // we register support for ERC165 itself here
        _registerInterface(_INTERFACE_ID_ERC165);
    }
    function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
        return _supportedInterfaces[interfaceId];
        }
    function _registerInterface(bytes4 interfaceId) internal virtual {
        require(interfaceId != 0xffffffff, "ERC165: invalid interface id");
        _supportedInterfaces[interfaceId] = true;
        }
    }
library SafeMath {
    function tryAdd(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        uint256 c = a + b;
        if (c < a) return (false, 0);
        return (true, c);
        }
    function trySub(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        if (b > a) return (false, 0);
        return (true, a - b);
        }
    function tryMul(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        if (a == 0) return (true, 0);
        uint256 c = a * b;
        if (c / a != b) return (false, 0);
        return (true, c);
        }
    function tryDiv(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        if (b == 0) return (false, 0);
        return (true, a / b);
        }
    function tryMod(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        if (b == 0) return (false, 0);
        return (true, a % b);
        }
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "SafeMath: addition overflow");
        return c;
        }
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b <= a, "SafeMath: subtraction overflow");
        return a - b;
        }
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        if (a == 0) return 0;
        uint256 c = a * b;
        require(c / a == b, "SafeMath: multiplication overflow");
        return c;
        }
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b > 0, "SafeMath: division by zero");
        return a / b;
        }
    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b > 0, "SafeMath: modulo by zero");
        return a % b;
        }
    function sub(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b <= a, errorMessage);
        return a - b;
        }
    function div(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b > 0, errorMessage);
        return a / b;
        }
    function mod(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b > 0, errorMessage);
        return a % b;
        }
    }
library Address {
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        // solhint-disable-next-line no-inline-assembly
        assembly { size := extcodesize(account) }
        return size > 0;
        }
    function sendValue(address payable recipient, uint256 amount) internal {
        require(address(this).balance >= amount, "Address: insufficient balance");

        // solhint-disable-next-line avoid-low-level-calls, avoid-call-value
        (bool success, ) = recipient.call{ value: amount }("");
        require(success, "Address: unable to send value, recipient may have reverted");
        }
    function functionCall(address target, bytes memory data) internal returns (bytes memory) { return functionCall(target, data, "Address: low-level call failed"); }
    function functionCall(address target, bytes memory data, string memory errorMessage) internal returns (bytes memory) { return functionCallWithValue(target, data, 0, errorMessage); }
    function functionCallWithValue(address target, bytes memory data, uint256 value) internal returns (bytes memory) { return functionCallWithValue(target, data, value, "Address: low-level call with value failed"); }
    function functionCallWithValue(address target, bytes memory data, uint256 value, string memory errorMessage) internal returns (bytes memory) {
        require(address(this).balance >= value, "Address: insufficient balance for call");
        require(isContract(target), "Address: call to non-contract");
        // solhint-disable-next-line avoid-low-level-calls
        (bool success, bytes memory returndata) = target.call{ value: value }(data);
        return _verifyCallResult(success, returndata, errorMessage);
        }
    function functionStaticCall(address target, bytes memory data) internal view returns (bytes memory) { return functionStaticCall(target, data, "Address: low-level static call failed"); }
    function functionStaticCall(address target, bytes memory data, string memory errorMessage) internal view returns (bytes memory) {
        require(isContract(target), "Address: static call to non-contract");
        // solhint-disable-next-line avoid-low-level-calls
        (bool success, bytes memory returndata) = target.staticcall(data);
        return _verifyCallResult(success, returndata, errorMessage);
        }
    function functionDelegateCall(address target, bytes memory data) internal returns (bytes memory) { return functionDelegateCall(target, data, "Address: low-level delegate call failed"); }
    function functionDelegateCall(address target, bytes memory data, string memory errorMessage) internal returns (bytes memory) {
        require(isContract(target), "Address: delegate call to non-contract");
        // solhint-disable-next-line avoid-low-level-calls
        (bool success, bytes memory returndata) = target.delegatecall(data);
        return _verifyCallResult(success, returndata, errorMessage);
        }
    function _verifyCallResult(bool success, bytes memory returndata, string memory errorMessage) private pure returns(bytes memory) {
        if (success) { return returndata; }
        else {
            // Look for revert reason and bubble it up if present
            if (returndata.length > 0) {
                // The easiest way to bubble the revert reason is using memory via assembly
                // solhint-disable-next-line no-inline-assembly
                assembly {
                    let returndata_size := mload(returndata)
                    revert(add(32, returndata), returndata_size)
                }
            } else { revert(errorMessage); }
        }
        }
    }

library EnumerableSet {
    struct Set {
        bytes32[] _values;
        mapping (bytes32 => uint256) _indexes;
    }
    struct Bytes32Set { Set _inner; }
    struct AddressSet { Set _inner; }
    struct UintSet { Set _inner; }
    function _add(Set storage set, bytes32 value) private returns (bool) {
        if (!_contains(set, value)) {
            set._values.push(value);
            // The value is stored at length-1, but we add 1 to all indexes
            // and use 0 as a sentinel value
            set._indexes[value] = set._values.length;
            return true;
        } else {
            return false;
        }
        }
    function _remove(Set storage set, bytes32 value) private returns (bool) {
        // We read and store the value's index to prevent multiple reads from the same storage slot
        uint256 valueIndex = set._indexes[value];

        if (valueIndex != 0) {

            uint256 toDeleteIndex = valueIndex - 1;
            uint256 lastIndex = set._values.length - 1;

            // When the value to delete is the last one, the swap operation is unnecessary. However, since this occurs
            // so rarely, we still do the swap anyway to avoid the gas cost of adding an 'if' statement.

            bytes32 lastvalue = set._values[lastIndex];
            set._values[toDeleteIndex] = lastvalue;
            set._indexes[lastvalue] = toDeleteIndex + 1;
            set._values.pop();
            delete set._indexes[value];

            return true;
        } else { return false; }
        }
    function _contains(Set storage set, bytes32 value) private view returns (bool) { return set._indexes[value] != 0; }
    function _length(Set storage set) private view returns (uint256) { return set._values.length; }
    function _at(Set storage set, uint256 index) private view returns (bytes32) {
        require(set._values.length > index, "EnumerableSet: index out of bounds");
        return set._values[index];
    }

    function add(Bytes32Set storage set, bytes32 value) internal returns (bool) { return _add(set._inner, value); }
    function remove(Bytes32Set storage set, bytes32 value) internal returns (bool) { return _remove(set._inner, value); }
    function contains(Bytes32Set storage set, bytes32 value) internal view returns (bool) { return _contains(set._inner, value); }
    function length(Bytes32Set storage set) internal view returns (uint256) { return _length(set._inner); }
    function at(Bytes32Set storage set, uint256 index) internal view returns (bytes32) { return _at(set._inner, index); }

    function add(AddressSet storage set, address value) internal returns (bool) { return _add(set._inner, bytes32(uint256(uint160(value)))); }
    function remove(AddressSet storage set, address value) internal returns (bool) { return _remove(set._inner, bytes32(uint256(uint160(value)))); }
    function contains(AddressSet storage set, address value) internal view returns (bool) { return _contains(set._inner, bytes32(uint256(uint160(value)))); }
    function length(AddressSet storage set) internal view returns (uint256) { return _length(set._inner); }
    function at(AddressSet storage set, uint256 index) internal view returns (address) { return address(uint160(uint256(_at(set._inner, index)))); }

    function add(UintSet storage set, uint256 value) internal returns (bool) { return _add(set._inner, bytes32(value)); }
    function remove(UintSet storage set, uint256 value) internal returns (bool) { return _remove(set._inner, bytes32(value)); }
    function contains(UintSet storage set, uint256 value) internal view returns (bool) { return _contains(set._inner, bytes32(value)); }
    function length(UintSet storage set) internal view returns (uint256) { return _length(set._inner); }
    function at(UintSet storage set, uint256 index) internal view returns (uint256) { return uint256(_at(set._inner, index));
    }
    }

library EnumerableMap {
    struct MapEntry {
        bytes32 _key;
        bytes32 _value;
    }
    struct Map {
        MapEntry[] _entries;
        mapping (bytes32 => uint256) _indexes;
    }
    struct UintToAddressMap { Map _inner; }

    function _set(Map storage map, bytes32 key, bytes32 value) private returns (bool) {
        uint256 keyIndex = map._indexes[key];

        if (keyIndex == 0) { // Equivalent to !contains(map, key)
            map._entries.push(MapEntry({ _key: key, _value: value }));
            map._indexes[key] = map._entries.length;
            return true;
        } else {
            map._entries[keyIndex - 1]._value = value;
            return false;
        }
        }
    function _remove(Map storage map, bytes32 key) private returns (bool) {
        uint256 keyIndex = map._indexes[key];

        if (keyIndex != 0) { // Equivalent to contains(map, key)
            uint256 toDeleteIndex = keyIndex - 1;
            uint256 lastIndex = map._entries.length - 1;
            MapEntry storage lastEntry = map._entries[lastIndex];
            map._entries[toDeleteIndex] = lastEntry;
            map._indexes[lastEntry._key] = toDeleteIndex + 1;
            map._entries.pop();
            delete map._indexes[key];

            return true;
        } else { return false; }
        }
    function _contains(Map storage map, bytes32 key) private view returns (bool) { return map._indexes[key] != 0; }
    function _length(Map storage map) private view returns (uint256) { return map._entries.length; }
    function _at(Map storage map, uint256 index) private view returns (bytes32, bytes32) {
        require(map._entries.length > index, "EnumerableMap: index out of bounds");
        MapEntry storage entry = map._entries[index];
        return (entry._key, entry._value);
        }
    function _tryGet(Map storage map, bytes32 key) private view returns (bool, bytes32) {
        uint256 keyIndex = map._indexes[key];
        if (keyIndex == 0) return (false, 0); // Equivalent to contains(map, key)
        return (true, map._entries[keyIndex - 1]._value); // All indexes are 1-based
        }
    function _get(Map storage map, bytes32 key) private view returns (bytes32) {
        uint256 keyIndex = map._indexes[key];
        require(keyIndex != 0, "EnumerableMap: nonexistent key"); // Equivalent to contains(map, key)
        return map._entries[keyIndex - 1]._value; // All indexes are 1-based
        }
    function _get(Map storage map, bytes32 key, string memory errorMessage) private view returns (bytes32) {
        uint256 keyIndex = map._indexes[key];
        require(keyIndex != 0, errorMessage); // Equivalent to contains(map, key)
        return map._entries[keyIndex - 1]._value; // All indexes are 1-based
    }
    
    function set(UintToAddressMap storage map, uint256 key, address value) internal returns (bool) { return _set(map._inner, bytes32(key), bytes32(uint256(uint160(value)))); }
    function remove(UintToAddressMap storage map, uint256 key) internal returns (bool) { return _remove(map._inner, bytes32(key)); }
    function contains(UintToAddressMap storage map, uint256 key) internal view returns (bool) { return _contains(map._inner, bytes32(key)); }
    function length(UintToAddressMap storage map) internal view returns (uint256) { return _length(map._inner); }
    function at(UintToAddressMap storage map, uint256 index) internal view returns (uint256, address) {
        (bytes32 key, bytes32 value) = _at(map._inner, index);
        return (uint256(key), address(uint160(uint256(value))));
        }
    function tryGet(UintToAddressMap storage map, uint256 key) internal view returns (bool, address) {
        (bool success, bytes32 value) = _tryGet(map._inner, bytes32(key));
        return (success, address(uint160(uint256(value))));
        }
    function get(UintToAddressMap storage map, uint256 key) internal view returns (address) { return address(uint160(uint256(_get(map._inner, bytes32(key))))); }
    function get(UintToAddressMap storage map, uint256 key, string memory errorMessage) internal view returns (address) { return address(uint160(uint256(_get(map._inner, bytes32(key), errorMessage)))); }
    }
library Strings {
    function toString(uint256 value) internal pure returns (string memory) {
        if (value == 0) { return "0"; }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        uint256 index = digits - 1;
        temp = value;
        while (temp != 0) {
            buffer[index--] = bytes1(uint8(48 + temp % 10));
            temp /= 10;
        }
        return string(buffer);
    }
    }
contract ERC721 is Context, ERC165, IERC721, IERC721Metadata, IERC721Enumerable {
    using SafeMath for uint256;
    using Address for address;
    using EnumerableSet for EnumerableSet.UintSet;
    using EnumerableMap for EnumerableMap.UintToAddressMap;
    using Strings for uint256;

    mapping (address => EnumerableSet.UintSet) private _holderTokens;
    mapping (uint256 => address) private _tokenApprovals;
    mapping (address => mapping (address => bool)) private _operatorApprovals;
    mapping (uint256 => string) private _tokenURIs;

    EnumerableMap.UintToAddressMap private _tokenOwners;

    string private _name;
    string private _symbol;
    string private _baseURI;

    // Equals to `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`
    // which can be also obtained as `IERC721Receiver(0).onERC721Received.selector`
    bytes4 private constant _ERC721_RECEIVED = 0x150b7a02;
    /*
     *     bytes4(keccak256('balanceOf(address)')) == 0x70a08231
     *     bytes4(keccak256('ownerOf(uint256)')) == 0x6352211e
     *     bytes4(keccak256('approve(address,uint256)')) == 0x095ea7b3
     *     bytes4(keccak256('getApproved(uint256)')) == 0x081812fc
     *     bytes4(keccak256('setApprovalForAll(address,bool)')) == 0xa22cb465
     *     bytes4(keccak256('isApprovedForAll(address,address)')) == 0xe985e9c5
     *     bytes4(keccak256('transferFrom(address,address,uint256)')) == 0x23b872dd
     *     bytes4(keccak256('safeTransferFrom(address,address,uint256)')) == 0x42842e0e
     *     bytes4(keccak256('safeTransferFrom(address,address,uint256,bytes)')) == 0xb88d4fde
     *
     *     => 0x70a08231 ^ 0x6352211e ^ 0x095ea7b3 ^ 0x081812fc ^
     *        0xa22cb465 ^ 0xe985e9c5 ^ 0x23b872dd ^ 0x42842e0e ^ 0xb88d4fde == 0x80ac58cd
     */
    bytes4 private constant _INTERFACE_ID_ERC721 = 0x80ac58cd;
    /*
     *     bytes4(keccak256('name()')) == 0x06fdde03
     *     bytes4(keccak256('symbol()')) == 0x95d89b41
     *     bytes4(keccak256('tokenURI(uint256)')) == 0xc87b56dd
     *
     *     => 0x06fdde03 ^ 0x95d89b41 ^ 0xc87b56dd == 0x5b5e139f
     */
    bytes4 private constant _INTERFACE_ID_ERC721_METADATA = 0x5b5e139f;
    /*
     *     bytes4(keccak256('totalSupply()')) == 0x18160ddd
     *     bytes4(keccak256('tokenOfOwnerByIndex(address,uint256)')) == 0x2f745c59
     *     bytes4(keccak256('tokenByIndex(uint256)')) == 0x4f6ccce7
     *
     *     => 0x18160ddd ^ 0x2f745c59 ^ 0x4f6ccce7 == 0x780e9d63
     */
    bytes4 private constant _INTERFACE_ID_ERC721_ENUMERABLE = 0x780e9d63;

    constructor (string memory name_, string memory symbol_) {
        _name = name_;
        _symbol = symbol_;

        // register the supported interfaces to conform to ERC721 via ERC165
        _registerInterface(_INTERFACE_ID_ERC721);
        _registerInterface(_INTERFACE_ID_ERC721_METADATA);
        _registerInterface(_INTERFACE_ID_ERC721_ENUMERABLE);
    }
    function balanceOf(address owner) public view virtual override returns (uint256) {
        require(owner != address(0), "ERC721: balance query for the zero address");
        return _holderTokens[owner].length();
        }
    function ownerOf(uint256 tokenId) public view virtual override returns (address) { return _tokenOwners.get(tokenId, "ERC721: owner query for nonexistent token"); }
    function name() public view virtual override returns (string memory) { return _name; }
    function symbol() public view virtual override returns (string memory) { return _symbol; }
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        string memory _tokenURI = _tokenURIs[tokenId];
        string memory base = baseURI();

        if (bytes(base).length == 0) { return _tokenURI; } // If no base URI return tokenURI
        if (bytes(_tokenURI).length > 0) { return string(abi.encodePacked(base, _tokenURI)); } // If both set concatenate baseURI and tokenURI
        return string(abi.encodePacked(base, tokenId.toString())); // If baseURI but not tokenURI concatenate baseURI and tokenID
        }
    function baseURI() public view virtual returns (string memory) { return _baseURI; }
    function tokenOfOwnerByIndex(address owner, uint256 index) public view virtual override returns (uint256) { return _holderTokens[owner].at(index); }
    function totalSupply() public view virtual override returns (uint256) { return _tokenOwners.length(); } // indexed by id
    function tokenByIndex(uint256 index) public view virtual override returns (uint256) {
        (uint256 tokenId, ) = _tokenOwners.at(index);
        return tokenId;
        }
    function approve(address to, uint256 tokenId) public virtual override {
        address owner = ERC721.ownerOf(tokenId);
        require(to != owner, "ERC721: approval to current owner");
        require(_msgSender() == owner || ERC721.isApprovedForAll(owner, _msgSender()), "ERC721: approve caller is not owner nor approved for all");
        _approve(to, tokenId);
        }
    function getApproved(uint256 tokenId) public view virtual override returns (address) {
        require(_exists(tokenId), "ERC721: approved query for nonexistent token");
        return _tokenApprovals[tokenId];
        }
    function setApprovalForAll(address operator, bool approved) public virtual override {
        require(operator != _msgSender(), "ERC721: approve to caller");
        _operatorApprovals[_msgSender()][operator] = approved;
        emit ApprovalForAll(_msgSender(), operator, approved);
        }
    function isApprovedForAll(address owner, address operator) public view virtual override returns (bool) { return _operatorApprovals[owner][operator]; }
    function transferFrom(address from, address to, uint256 tokenId) public virtual override {
        //solhint-disable-next-line max-line-length
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: transfer caller is not owner nor approved");
        _transfer(from, to, tokenId);
        }
    function safeTransferFrom(address from, address to, uint256 tokenId) public virtual override { safeTransferFrom(from, to, tokenId, ""); }
    function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory _data) public virtual override {
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: transfer caller is not owner nor approved");
        _safeTransfer(from, to, tokenId, _data);
        }
    /**
     * @dev Safely transfers `tokenId` token from `from` to `to`, checking first that contract recipients
     * are aware of the ERC721 protocol to prevent tokens from being forever locked.
     *
     * `_data` is additional data, it has no specified format and it is sent in call to `to`.
     *
     * This internal function is equivalent to {safeTransferFrom}, and can be used to e.g.
     * implement alternative mechanisms to perform token transfer, such as signature-based.
     *
     * Requirements:
     *
     * - `from` cannot be the zero address.
     * - `to` cannot be the zero address.
     * - `tokenId` token must exist and be owned by `from`.
     * - If `to` refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon a safe transfer.
     *
     * Emits a {Transfer} event.
     */
    function _safeTransfer(address from, address to, uint256 tokenId, bytes memory _data) internal virtual {
        _transfer(from, to, tokenId);
        require(_checkOnERC721Received(from, to, tokenId, _data), "ERC721: transfer to non ERC721Receiver implementer");
        }
    function _exists(uint256 tokenId) internal view virtual returns (bool) { return _tokenOwners.contains(tokenId); }
    function _isApprovedOrOwner(address spender, uint256 tokenId) internal view virtual returns (bool) {
        require(_exists(tokenId), "ERC721: operator query for nonexistent token");
        address owner = ERC721.ownerOf(tokenId);
        return (spender == owner || getApproved(tokenId) == spender || ERC721.isApprovedForAll(owner, spender));
        }
    function _safeMint(address to, uint256 tokenId) internal virtual {
        _safeMint(to, tokenId, "");
        }
    function _safeMint(address to, uint256 tokenId, bytes memory _data) internal virtual {
        _mint(to, tokenId);
        require(_checkOnERC721Received(address(0), to, tokenId, _data), "ERC721: transfer to non ERC721Receiver implementer");
        }
    function _mint(address to, uint256 tokenId) internal virtual {
        require(to != address(0), "ERC721: mint to the zero address");
        require(!_exists(tokenId), "ERC721: token already minted");

        _beforeTokenTransfer(address(0), to, tokenId);

        _holderTokens[to].add(tokenId);
        _tokenOwners.set(tokenId, to);
        emit Transfer(address(0), to, tokenId);
        }
    function _burn(uint256 tokenId) internal virtual {
        address owner = ERC721.ownerOf(tokenId); // internal owner

        _beforeTokenTransfer(owner, address(0), tokenId);
        _approve(address(0), tokenId);
        if (bytes(_tokenURIs[tokenId]).length != 0) { delete _tokenURIs[tokenId]; }

        _holderTokens[owner].remove(tokenId);
        _tokenOwners.remove(tokenId);
        emit Transfer(owner, address(0), tokenId);
        }
    function _transfer(address from, address to, uint256 tokenId) internal virtual {
        require(ERC721.ownerOf(tokenId) == from, "ERC721: transfer of token that is not own"); // internal owner
        require(to != address(0), "ERC721: transfer to the zero address");

        _beforeTokenTransfer(from, to, tokenId);
        _approve(address(0), tokenId);

        _holderTokens[from].remove(tokenId);
        _holderTokens[to].add(tokenId);
        _tokenOwners.set(tokenId, to);
        emit Transfer(from, to, tokenId);
        }
    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal virtual {
        require(_exists(tokenId), "ERC721Metadata: URI set of nonexistent token");
        _tokenURIs[tokenId] = _tokenURI;
        }
    function _setBaseURI(string memory baseURI_) internal virtual { _baseURI = baseURI_; }
    function _checkOnERC721Received(address from, address to, uint256 tokenId, bytes memory _data) private returns (bool) {
        if (!to.isContract()) { return true; }
        bytes memory returndata = to.functionCall(abi.encodeWithSelector( IERC721Receiver(to).onERC721Received.selector, _msgSender(), from, tokenId, _data ), "ERC721: transfer to non ERC721Receiver implementer");
        bytes4 retval = abi.decode(returndata, (bytes4));
        return (retval == _ERC721_RECEIVED);
        }
    function _approve(address to, uint256 tokenId) private {
        _tokenApprovals[tokenId] = to;
        emit Approval(ERC721.ownerOf(tokenId), to, tokenId); // internal owner
        }
    /**
     * @dev Hook that is called before any token transfer. This includes minting
     * and burning.
     *
     * Calling conditions:
     *
     * - When `from` and `to` are both non-zero, ``from``'s `tokenId` will be
     * transferred to `to`.
     * - When `from` is zero, `tokenId` will be minted for `to`.
     * - When `to` is zero, ``from``'s `tokenId` will be burned.
     * - `from` cannot be the zero address.
     * - `to` cannot be the zero address.
     *
     * To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
     */
    function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal virtual { }
    }
abstract contract Ownable is Context {
    address private _owner;

    modifier onlyOwner() {
        require(owner() == _msgSender(), "Ownable: caller is not the owner");
        _;
    }

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    constructor () {
        address msgSender = _msgSender();
        _owner = msgSender;
        emit OwnershipTransferred(address(0), msgSender);
    }
    function owner() public view virtual returns (address) { return _owner; }
    function renounceOwnership() public virtual onlyOwner {
        emit OwnershipTransferred(_owner, address(0));
        _owner = address(0);
        }
    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        emit OwnershipTransferred(_owner, newOwner);
        _owner = newOwner;
        }
}

interface IERC20Burnable {
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function burn(uint256 amount) external;
    function burnFrom(address account, uint256 amount) external;

}
/**
 * @dev Interface of the ERC20 standard as defined in the EIP.
 */
interface IERC20_Ex {
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function increaseAllowance(address spender, uint256 addedValue) external returns (bool);
    function decreaseAllowance(address spender, uint256 subtractedValue) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
}
library OOOSafeMath {
    function safeAdd(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "SafeMath: addition overflow");
        return c;
    }
    function safeSub(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b <= a, "SafeMath: subtraction overflow");
        return a - b;
    }
    function safeMul(uint256 a, uint256 b) internal pure returns (uint256) {
        if (a == 0) return 0;
        uint256 c = a * b;
        require(c / a == b, "SafeMath: multiplication overflow");
        return c;
    }
    function saveDiv(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b > 0, "SafeMath: division by zero");
        return a / b;
    }
    function safeMod(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b > 0, "SafeMath: modulo by zero");
        return a % b;
    }
}

interface IConsumerBase {
    function rawReceiveData(uint256 _price, bytes32 _requestId) external;
}

/**
 * @title RequestIdBase
 *
 * @dev A contract used by ConsumerBase and Router to generate requestIds
 *
 */
contract RequestIdBase {
    function makeRequestId(
        address _dataConsumer,
        address _dataProvider,
        address _router,
        uint256 _requestNonce,
        bytes32 _data) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(_dataConsumer, _dataProvider, _router, _requestNonce, _data));
    }
}

/**
 * @title ConsumerBase smart contract
 *
 * @dev This contract can be imported by any smart contract wishing to include
 * off-chain data or data from a different network within it.
 *
 * The consumer initiates a data request by forwarding the request to the Router
 * smart contract, from where the data provider(s) pick up and process the
 * data request, and forward it back to the specified callback function.
 *
 */
abstract contract ConsumerBase is RequestIdBase {
    using OOOSafeMath for uint256;

    mapping(address => uint256) private nonces;

    IERC20_Ex internal immutable xFUND;
    IRouter internal router;

    constructor(address _router, address _xfund) {
        require(_router != address(0), "router cannot be the zero address");
        require(_xfund != address(0), "xfund cannot be the zero address");
        router = IRouter(_router);
        xFUND = IERC20_Ex(_xfund);
    }
    function _setRouter(address _router) internal returns (bool) {
        require(_router != address(0), "router cannot be the zero address");
        router = IRouter(_router);
        return true;
    }
    function _increaseRouterAllowance(uint256 _amount) internal returns (bool) {
        // The context of msg.sender is this contract's address
        require(xFUND.increaseAllowance(address(router), _amount), "failed to increase allowance");
        return true;
    }

    /**
     * @dev _requestData - initialises a data request. forwards the request to the deployed
     * Router smart contract.
     *
     * @param _dataProvider payable address of the data provider
     * @param _fee uint256 fee to be paid
     * @param _data bytes32 value of data being requested, e.g. PRICE.BTC.USD.AVG requests
     * average price for BTC/USD pair
     * @return requestId bytes32 request ID which can be used to track or cancel the request
     */
    function _requestData(address _dataProvider, uint256 _fee, bytes32 _data)
    internal returns (bytes32) {
        bytes32 requestId = makeRequestId(address(this), _dataProvider, address(router), nonces[_dataProvider], _data);
        // call the underlying ConsumerLib.sol lib's submitDataRequest function
        require(router.initialiseRequest(_dataProvider, _fee, _data));
        nonces[_dataProvider] = nonces[_dataProvider].safeAdd(1);
        return requestId;
    }

    /**
     * @dev rawReceiveData - Called by the Router's fulfillRequest function
     * in order to fulfil a data request. Data providers call the Router's fulfillRequest function
     * The request is validated to ensure it has indeed been sent via the Router.
     *
     * The Router will only call rawReceiveData once it has validated the origin of the data fulfillment.
     * rawReceiveData then calls the user defined receiveData function to finalise the fulfilment.
     * Contract developers will need to override the abstract receiveData function defined below.
     *
     * @param _price uint256 result being sent
     * @param _requestId bytes32 request ID of the request being fulfilled
     * has sent the data
     */
    function rawReceiveData(
        uint256 _price,
        bytes32 _requestId) external
    {
        // validate it came from the router
        require(msg.sender == address(router), "only Router can call");

        // call override function in end-user's contract
        receiveData(_price, _requestId);
    }

    /**
    * @dev receiveData - should be overridden by contract developers to process the
    * data fulfilment in their own contract.
    *
    * @param _price uint256 result being sent
    * @param _requestId bytes32 request ID of the request being fulfilled
    */
    function receiveData(uint256 _price, bytes32 _requestId) internal virtual;
    function getRouterAddress() external view returns (address) { return address(router); }
}
interface IRouter {
    function initialiseRequest(address, uint256, bytes32) external returns (bool);
}

contract MyDataConsumerForLeash is ConsumerBase, Ownable {
    uint256 public price;
    address NFTAddress;

    event GotSomeData(bytes32 requestId, uint256 price);

    // RinkeBy 
    // address private ROUTER_ADDRESS = address(0x05AB63BeC9CfC3897a20dE62f5f812de10301FDf);

    // RinkeBy
    // address private XFUND_ADDRESS = address(0x245330351344F9301690D5D8De2A07f5F32e1149);

    // Mainnet 
    // address private constant ROUTER_ADDRESS = address(0x9ac9AE20a17779c17b069b48A8788e3455fC6121);

    // // Mainnet
    // address private constant XFUND_ADDRESS = address(0x892A6f9dF0147e5f079b0993F486F9acA3c87881);

    modifier onlyNFTOrOwner() {
        require(msg.sender == NFTAddress || msg.sender == owner(), "Price Can only be fetched by NFT contract or the Owner");
        _;
    }

    constructor(address router, address xfund) ConsumerBase(router, xfund) {
        price = 0;
    }

    // Optionally protect with a modifier to limit who can call
    function getData(address PROVIDER_ADDRESS, uint256 _fee, bytes32 _data) external onlyNFTOrOwner returns (bytes32) {

        // bytes32 _data = 0x4554482e4c454153482e50522e41564300000000000000000000000000000000;  //ETH.LEASH.PR.AVC
    
        // uint256 _fee = 100000000;

        // Rinkeby 
        // address PROVIDER_ADDRESS = address(0x611661f4B5D82079E924AcE2A6D113fAbd214b14);

        // Mainnet 
        // address PROVIDER_ADDRESS = address(0xFDEc0386011d085A6b4F0e37Fab5d7f2601aCB33);

        // _provider = PROVIDER_ADDRESS
        return _requestData(PROVIDER_ADDRESS, _fee, _data);
    }

    // Todo - protect with a modifier to limit who can call!
    function increaseRouterAllowance(uint256 _amount) external onlyOwner {
        require(_increaseRouterAllowance(_amount));     // 115792089237316195423570985008687907853269984665640564039457584007913129639935
    }

    // ConsumerBase ensures only the Router can call this
    function receiveData(uint256 _price, bytes32 _requestId) internal override {
        price = _price;
        // optionally emit an event to the logs
        emit GotSomeData(_requestId, _price);
    }

    function setNFTContract(address _nftAddress) external onlyOwner {
        NFTAddress = _nftAddress;        
    }
}

contract MyDataConsumerForShib is ConsumerBase, Ownable {
    uint256 public price;
    address NFTAddress;

    event GotSomeData(bytes32 requestId, uint256 price);

     // RinkeBy 
    // address private ROUTER_ADDRESS = address(0x05AB63BeC9CfC3897a20dE62f5f812de10301FDf);

    // RinkeBy
    // address private XFUND_ADDRESS = address(0x245330351344F9301690D5D8De2A07f5F32e1149);

    // Mainnet 
    // address private constant ROUTER_ADDRESS = address(0x9ac9AE20a17779c17b069b48A8788e3455fC6121);

    // // Mainnet
    // address private constant XFUND_ADDRESS = address(0x892A6f9dF0147e5f079b0993F486F9acA3c87881);

    modifier onlyNFTOrOwner() {
        require(msg.sender == NFTAddress || msg.sender == owner(), "Price Can only be fetched by NFT contract or the Owner");
        _;
    }

    constructor(address router, address xfund) ConsumerBase(router, xfund) {
        price = 0;
    }

    // Optionally protect with a modifier to limit who can call
    function getData(address PROVIDER_ADDRESS, uint256 _fee, bytes32 _data) external onlyNFTOrOwner returns (bytes32) {

        // bytes32 _data = 0x555344542e534849422e50522e41564300000000000000000000000000000000;  //USDT.SHIB.PR.AVC
    
        // uint256 _fee = 100000000;

        // Rinkeby 
        // address PROVIDER_ADDRESS = address(0x611661f4B5D82079E924AcE2A6D113fAbd214b14);

        // Mainnet 
        // address PROVIDER_ADDRESS = address(0xFDEc0386011d085A6b4F0e37Fab5d7f2601aCB33);

        // _provider = PROVIDER_ADDRESS
        return _requestData(PROVIDER_ADDRESS, _fee, _data);
    }

    // Todo - protect with a modifier to limit who can call!
    function increaseRouterAllowance(uint256 _amount) external onlyOwner {
        require(_increaseRouterAllowance(_amount));       // 115792089237316195423570985008687907853269984665640564039457584007913129639935
    }

    // ConsumerBase ensures only the Router can call this
    function receiveData(uint256 _price, bytes32 _requestId) internal override {
        price = _price;
        // optionally emit an event to the logs
        emit GotSomeData(_requestId, _price);
    }

    function setNFTContract(address _nftAddress) external onlyOwner {
        NFTAddress = _nftAddress;        
    }
}
contract SHIBOSHIS is ERC721, Ownable {
    using SafeMath for uint256;
    IERC20Burnable public immutable LEASH;
    IERC20Burnable public immutable SHIB;
    MyDataConsumerForLeash public immutable LeashPrice;
    MyDataConsumerForShib public immutable ShibPrice;

    string public SHIBOSHIS_PROVENANCE = "";

    uint256 public constant SALE_START_TIMESTAMP = 1634247000;
    uint256 public constant ALLOW_ETH_TIMESTAMP = SALE_START_TIMESTAMP + 86400 ;
    uint256 public constant MAX_NFT_SUPPLY = 10000;
    uint256 public CAPPED_NFT_LIMIT_PER_USER = 10;
    uint256 public NAME_CHANGE_PRICE;
    uint256 public LEASH_PRICE;
    uint256 public startingIndexBlock;
    uint256 public startingIndex;
    
    address public moderator;

    uint256 private tier1Leash = 10;
    uint256 private tier2Leash = 20;
    uint256 private tier3Leash = 30;

    uint256 private tier1ETH = 100000000000000000; 
    uint256 private tier2ETH = 200000000000000000;
    uint256 private tier3ETH = 300000000000000000;

    bool public pausedShibOracle = false;
    bool public pausedLeashOracle = false;

    mapping (uint256 => string) private _tokenName;

    mapping (string => bool) private _nameReserved;

    event NameChange (uint256 indexed NFTIndex, string newName);
    
    modifier onlyModerator() {
        require(msg.sender == moderator, "Caller is not the moderator");
        _;
    }

    constructor(string memory name, string memory symbol,  address _leashToken, address _shibToken, address  _leashpriceToken, address _shibPriceToken, address _moderator, uint256 _NAME_CHANGE_PRICE, uint256 _LEASH_PRICE) ERC721(name, symbol) {
        LEASH = IERC20Burnable(_leashToken);
        SHIB = IERC20Burnable(_shibToken);
        LeashPrice = MyDataConsumerForLeash(_leashpriceToken);
        ShibPrice =  MyDataConsumerForShib(_shibPriceToken);
        moderator = _moderator;
        NAME_CHANGE_PRICE = _NAME_CHANGE_PRICE;
        LEASH_PRICE = _LEASH_PRICE;
    }

    /**
     * @dev Returns name of the NFT at index.
     */
    function tokenNameByIndex(uint256 index) public view returns (string memory) {
        return _tokenName[index];
    }

    /**
     * @dev Returns if the name has been reserved.
     */
    function isNameReserved(string memory nameString) public view returns (bool) {
        return _nameReserved[toLower(nameString)];
    }

    function flipShibOracle() public onlyOwner {
        pausedShibOracle = !pausedShibOracle;
    }

    function flipLeashOracle() public onlyOwner {
        pausedLeashOracle = !pausedLeashOracle;
    }

    /**
     * @dev Gets current NFT Price without oracle
     */
    function getNFTPriceForLEASH(uint256 numberOfNfts) public view returns (uint256) {
        require(block.timestamp >= SALE_START_TIMESTAMP, "Sale has not started");
        require(totalSupply() < MAX_NFT_SUPPLY, "Sale has already ended");
        
        uint currentSupply = totalSupply();

        (uint256 _la, uint256 _lb, uint256 _lc) = getLEASHPerETHRate();

        if (currentSupply >= 9000) {
            return (getLeashEthPrice().mul(_lc).div(100)).mul(numberOfNfts); // 9000 - 1000 # of LEASH for 0.3 ETH
        } else if (currentSupply >= 3000) {
            return (getLeashEthPrice().mul(_lb).div(100)).mul(numberOfNfts); // 3000 - 8999 # of LEASH for 0.2 ETH
        } else {
            return (getLeashEthPrice().mul(_la).div(100)).mul(numberOfNfts); // 0 - 2999 # of LEASH for 0.1 ETH
        }
    }
    
    function getNFTPriceForETH(uint256 numberOfNfts) public view returns (uint256) {
        require(block.timestamp >= SALE_START_TIMESTAMP, "Sale has not started");
        require(totalSupply() < MAX_NFT_SUPPLY, "Sale has already ended");

        uint currentSupply = totalSupply();
        
        (uint256 _ea, uint256 _eb, uint256 _ec) = getETHRate();

        if (currentSupply >= 8000) {
            return numberOfNfts.mul(_ec); // 8000 - 1000 0.3 ETH
        } else if (currentSupply >= 3000) {
            return numberOfNfts.mul(_eb); // 3000 - 7999 0.2 ETH
        } else {
            return numberOfNfts.mul(_ea); // 0 - 2999 0.1 ETH
        }
    }

    function setNameChangePrice(uint256 _NAME_CHANGE_PRICE) public onlyOwner {
        NAME_CHANGE_PRICE = _NAME_CHANGE_PRICE;
    }

    function setLeashEthPrice(uint256 _LEASH_PRICE) public onlyOwner {
        LEASH_PRICE = _LEASH_PRICE;
    }
     
    function setETHRate(uint256 _tier1ETH, uint256 _tier2ETH, uint256 _tier3ETH) public onlyOwner returns(uint256, uint256, uint256){
        tier1ETH = _tier1ETH;
        tier2ETH = _tier2ETH;
        tier3ETH = _tier3ETH;
        return (tier1ETH, tier2ETH, tier3ETH);
    }

    function setLEASHPerETHRate(uint256 _tier1Leash, uint256 _tier2Leash, uint256 _tier3Leash) public onlyOwner returns(uint256, uint256, uint256){
        tier1Leash = _tier1Leash;
        tier2Leash = _tier2Leash;
        tier3Leash = _tier3Leash;
        return (tier1Leash, tier2Leash, tier3Leash);
    }

    function getETHRate() public view returns(uint256, uint256, uint256){ return (tier1ETH, tier2ETH, tier3ETH); }
    function getLEASHPerETHRate() public view returns(uint256, uint256, uint256){ return (tier1Leash, tier2Leash, tier3Leash); }
    function getNameChangePrice() public view returns (uint256) {
        if(!pausedShibOracle){ return ShibPrice.price().mul(100); }
        else { return NAME_CHANGE_PRICE; }
        }
    function getLeashEthPrice() internal view returns(uint256){
        if(!pausedLeashOracle){ return LeashPrice.price(); }
        else{ return LEASH_PRICE; }
        }
    function changeCappedNFTLimitPerUser(uint256 _CAPPED_NFT_LIMIT_PER_USER) public onlyOwner returns (bool) {
        CAPPED_NFT_LIMIT_PER_USER = _CAPPED_NFT_LIMIT_PER_USER;
        return true;
        }
    function withdrawETH() public onlyOwner {
        uint balance = address(this).balance;
        require(balance > 0, "ETH balance is 0");
        payable(msg.sender).transfer(balance);
        }
    function withdrawLEASH() public onlyOwner {
        uint balance = LEASH.balanceOf(address(this));
        require(balance > 0, "LEASH balance is 0");
        LEASH.transfer(msg.sender, balance);
    }

    /**
     * @dev Changes the name for shiboshis tokenId
     */
    function changeName(uint256 tokenId, string memory newName) external {
        address owner = ownerOf(tokenId);

        require(_msgSender() == owner, "ERC721: caller is not the owner");
        require(validateName(newName) == true, "Not a valid new name");
        require(sha256(bytes(newName)) != sha256(bytes(_tokenName[tokenId])), "New name is same as the current one");
        require(isNameReserved(newName) == false, "Name already reserved");

        SHIB.transferFrom(msg.sender, address(this), getNameChangePrice());
        // If already named, dereserve old name
        if (bytes(_tokenName[tokenId]).length > 0) { toggleReserveName(_tokenName[tokenId], false); }
        toggleReserveName(newName, true);
        _tokenName[tokenId] = newName;
        SHIB.burn(getNameChangePrice());
        emit NameChange(tokenId, newName);
    }

    /*     
    * Set provenance once it's calculated
    */
    function setProvenanceHash(string memory provenanceHash) public onlyOwner { SHIBOSHIS_PROVENANCE = provenanceHash; }
    function changeModerator(address _moderator) public onlyOwner { moderator = _moderator; }
    function setBaseURI(string memory baseURI) public onlyModerator { _setBaseURI(baseURI); }
   
    /**
    * Mints NFT
    */
    function mintNFT(uint numberOfNfts, uint256 _value, bool _isETH) public payable {
        require(totalSupply() < MAX_NFT_SUPPLY, "Sale has already ended");
        require(numberOfNfts > 0, "numberOfNfts cannot be 0");
        require(totalSupply().add(numberOfNfts) <= MAX_NFT_SUPPLY, "Exceeds MAX_NFT_SUPPLY");
        require(IERC721(address(this)).balanceOf(msg.sender).add(numberOfNfts) <= CAPPED_NFT_LIMIT_PER_USER, "Exceeds CAPPED_NFT_LIMIT_PER_USER");
        
        if(block.timestamp <= ALLOW_ETH_TIMESTAMP) {
            require(getNFTPriceForLEASH(numberOfNfts) == _value, "LEASH value sent is not correct");
            LEASH.transferFrom(msg.sender, address(this), _value);
        }
        else if(block.timestamp > ALLOW_ETH_TIMESTAMP && !_isETH) {
            require(getNFTPriceForLEASH(numberOfNfts) == _value, "LEASH value sent is not correct");      
            LEASH.transferFrom(msg.sender, address(this), _value);
        }
        else if(block.timestamp > ALLOW_ETH_TIMESTAMP && _isETH) {
            require(getNFTPriceForETH(numberOfNfts) == msg.value, "ETH value sent is not correct");
        }
        
        for(uint i = 0; i < numberOfNfts; i++) {
            uint mintIndex = totalSupply();
            if (totalSupply() < MAX_NFT_SUPPLY) {  _safeMint(msg.sender, mintIndex); }
        }

        // If we haven't set the starting index and this is either 1) the last saleable token or 2) the first token to be sold after
        // the end of pre-sale, set the starting index block
        if (startingIndexBlock == 0 && (totalSupply() == MAX_NFT_SUPPLY )) {
            startingIndexBlock = block.number;
        } 
    }

    /**
     * @dev Finalize starting index
     */
    function finalizeStartingIndex() public {
        require(startingIndex == 0, "Starting index is already set");
        require(startingIndexBlock != 0, "Starting index block must be set");

        startingIndex = uint(blockhash(startingIndexBlock)) % MAX_NFT_SUPPLY;
        // Just a sanity case in the worst case if this function is called late (EVM only stores last 256 block hashes)
        if (block.number.sub(startingIndexBlock) > 255) {
            startingIndex = uint(blockhash(block.number-1)) % MAX_NFT_SUPPLY;
        }
        // Prevent default sequence
        if (startingIndex == 0) {
            startingIndex = startingIndex.add(1);
        }
    }

    /**
     * @dev Reserves the name if isReserve is set to true, de-reserves if set to false
     */
    function toggleReserveName(string memory str, bool isReserve) internal {
        _nameReserved[toLower(str)] = isReserve;
    }

    /**
     * @dev Check if the name string is valid (Alphanumeric and spaces without leading or trailing space)
     */
    function validateName(string memory str) public pure returns (bool){
        bytes memory b = bytes(str);
        if(b.length < 1) return false;
        if(b.length > 25) return false; // Cannot be longer than 25 characters
        if(b[0] == 0x20) return false; // Leading space
        if (b[b.length - 1] == 0x20) return false; // Trailing space

        bytes1 lastChar = b[0];

        for(uint i; i<b.length; i++){
            bytes1 char = b[i];

            if (char == 0x20 && lastChar == 0x20) return false; // Cannot contain continous spaces

            if(
                !(char >= 0x30 && char <= 0x39) && //9-0
                !(char >= 0x41 && char <= 0x5A) && //A-Z
                !(char >= 0x61 && char <= 0x7A) && //a-z
                !(char == 0x20) //space
            )
                return false;

            lastChar = char;
        }

        return true;
    }
    function toLower(string memory str) public pure returns (string memory){
        bytes memory bStr = bytes(str);
        bytes memory bLower = new bytes(bStr.length);
        for (uint i = 0; i < bStr.length; i++) {
            // Uppercase character
            if ((uint8(bStr[i]) >= 65) && (uint8(bStr[i]) <= 90)) { bLower[i] = bytes1(uint8(bStr[i]) + 32); }
            else { bLower[i] = bStr[i]; }
        }
        return string(bLower);
    }
}
