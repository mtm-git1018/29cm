import Link from "next/link";

function Card({
  id,
  imgSrc,
  brandName,
  productName,
  price,
  discount,
  discountPrice,
  like,
  reviews,
}) {
  return (
    <div className="out_box">
      {/* next.js에서는 a태그말고 Link태그 사용을 권장함 */}
      {/* <Link></Link> 컴포넌트의 사용되는 prop으로 next.js v12이후 도입된 새로운 동작  */}
      {/* 이전방식 => 링크 안에 a태그로 꼭 감쌋었음 / 지금은 Link로 바로 연결함 */}

      <Link href={`/order/${id}`} className="img_box">
        <img src={imgSrc} alt="" />
      </Link>
      <div className="text_content">
        <div className="text_head">
          <a href="#none" className="brand_name">
            {brandName}
          </a>
          <h5 className="product_name">{productName}</h5>
        </div>

        <div className="text_center">
          {price && discount && (
            <>
              {" "}
              <strong className="price">{price}</strong>
              <span className="discount">{discount}</span>
            </>
          )}

          <strong className="discount_price">{discountPrice}</strong>
          <button className="coupon">쿠폰</button>
        </div>

        <div className="text_bottom">
          <button className="icon heart_icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 18 18"
            >
              <path d="M9 6.088C9 3.831 10.791 2 13 2s4 1.83 4 4.088c0 1.743-1.46 3.23-1.46 3.23L9 16 2.46 9.318S1 7.83 1 6.088C1 3.831 2.791 2 5 2s4 1.83 4 4.088z"></path>
            </svg>
            <span className="like">{like}</span>
          </button>
          <button className="icon review_icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 15 16"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M1 2.007v8.813c0 .556.457 1.007 1.02 1.007h7.749L14 15V2.007C14 1.451 13.543 1 12.98 1H2.02C1.457 1 1 1.451 1 2.007z"
              ></path>
            </svg>
            <span className="review">{reviews}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
