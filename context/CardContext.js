import { createContext, useContext, useState } from "react";
// createContext : 전역에서 데이터를 공유할 수 있는 통로
// useContext : 컨텍스트에 있는 값을 읽어오기 위한 hook

const CardContext = createContext();

export const CardProvider = ({ children }) => {
  //children : 하단 return문 에서 전달할 컴포넌트가 감싸고 있는 자식요소 들
  const [cardData, setCardData] = useState([
    {
      id: 1,
      imgSrc:
        "https://img.29cm.co.kr/next-product/2023/03/13/6df115b934da4129a4a154606084bfdd_20230313145108.jpg?width=400",
      brandName: "프리츠한센",
      productName: "프리츠한센 - IKEBANA SMALL(BRASS)",
      price: "178,000원",
      discount: "8%",
      discountPrice: "163,760원",
      like: "10,642",
      reviews: "201",
      category: "홈데코",
      detailImageSrc: "/images/fritzhansen_detail.jpg",
      explain:
        "세계적인 클래식 & 컨템포러리 가구, 조명, 소품으로 구성된 인터내셔널 디자인 브랜드입니다.",
    },
    {
      id: 2,
      imgSrc:
        "https://img.29cm.co.kr/item/202401/11eeb4ff03df260391eb4bbeb9e18de8.jpg?width=700&format=webp",
      brandName: "바나코",
      productName: "바나코 PENTA 사이드 테이블",
      price: "49,900",
      discount: "27%",
      discountPrice: "36,465",
      like: "1032",
      reviews: "32",
      category: "가구",
      detailImageSrc: "/images/banaco_detail.jpg",
    },
    {
      id: 3,
      imgSrc:
        "https://img.29cm.co.kr/item/202403/11eee2a5ea13c82682f27532668945d8.png?width=400",
      brandName: "다이노탱",
      productName: "Quokka in School Figure Pen",
      discountPrice: "7,000",
      like: "8,347",
      reviews: "125",
      category: "아트",
      detailImageSrc: "/images/dino1_detail.jpg",
    },
    {
      id: 4,
      imgSrc:
        "https://img.29cm.co.kr/next-product/2022/05/11/3604577eaec24c9b84890b0b40b13381_20220511034008.png?width=700&format=webp",

      brandName: "레어로우",
      productName: "포 스태킹 쉘브 미니 (7 Colors)",
      price: "90,000",
      discount: "24%",
      discountPrice: "68,850",
      like: "640",
      reviews: "20",
      category: "가구",
      detailImageSrc: "/images/rarerow_detail.jpg",
    },
    {
      id: 5,
      imgSrc:
        "https://img.29cm.co.kr/next-product/2023/01/04/fd590e2b68114bafa833607afce1b3d0_20230104223415.jpg?width=400",

      brandName: "에프에프 컬렉티브",
      productName: "[29CM 단독] Spiral Floor Lamp (Black / White)",
      price: "440,000",
      discount: "25%",
      discountPrice: "330,000",
      like: "3712",
      reviews: "49",
      category: "조명",
      detailImageSrc: "/images/ff_detail.jpg",
    },
    {
      id: 6,
      imgSrc:
        "https://img.29cm.co.kr/item/202312/11ee9322ebb850b98a7f9f31055ef7b3.png?width=400",
      brandName: "다이노탱",
      productName: "Touch the Quokka",
      discountPrice: "36,000",
      like: "5,511",
      reviews: "221",
      category: "조명",
      detailImageSrc: "/images/dino2_detail.jpg",
    },
  ]);

  const additionalData = [
    {
      id: 7,
      imgSrc:
        "https://img.29cm.co.kr/next-product/2020/08/06/ac0a1f8071bd43b2a442103925b6cb5d_20200806165437.png?width=400",
      brandName: "아티쉬",
      productName:
        "[모빌] 미래 자연 Futura Natura / 플렌스테드 모빌(Flensted Mobiles)",
      discountPrice: "83,000",
      likes: "2,878",
      reviews: "36",
      category: "홈데코",
      detailImageSrc: "/images/artish_detail.jpg",
    },
    {
      id: 8,
      imgSrc:
        "https://img.29cm.co.kr/item/202402/11eecb9a03efe7acb238fb8b76536cad.jpg?width=400",
      brandName: "잭슨카멜레온",
      productName: "Ink Sofa Table",
      discountPrice: "979,000",
      likes: "491",
      reviews: "1",
      category: "가구",
      detailImageSrc: "/images/lexon_detail.jpg",
    },
    {
      id: 9,
      imgSrc:
        "https://img.29cm.co.kr/item/202312/11ee9322ebb850b98a7f9f31055ef7b3.png?width=400",
      brandName: "다이노탱",
      productName: "Touch the Quokka",
      discountPrice: "979,000",
      likes: "5,511",
      reviews: "221",
      category: "조명",
      detailImageSrc: "/images/lumir_detail.jpg",
    },
  ];
  const [cardIndex, setCardIndex] = useState(0);
  const addCard = () => {
    if (cardIndex < additionalData.length) {
      // setCardData([...cardData, additionalData[cardIndex]]);
      // setCardIndex(cardIndex + 1);
      // 카드 컴포넌트 3개씩 추가

      const nextIndex = cardIndex + 3;

      setCardData([...cardData, ...additionalData.slice(cardIndex, nextIndex)]);
      //slice : slice() 메소드를 사용해서 cardIndex부터 nextIndex - 1 값까지 요소를 추출하므로, 여기서는 3개의 데이터를 가져와 cardData 추가
      setCardIndex(nextIndex); // 인덱스를 3씩 증가시킴

      // 무한스크롤로 변경하면서 없앰
      // setTimeout(() => {
      //   // 새 요소가 추가된 후 하단으로 스크롤
      //   bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      //   // ?. : optional chaining은 null / undefined 인 경우 에러를 발생시키지 않고 그냥 반환해줌
      //   // current는 null이나 undefined일 때 접근할 수 있게 해줌
      // });
    }
  };

  return (
    <CardContext.Provider value={{ cardData, setCardData, addCard }}>
      {children}
    </CardContext.Provider>

    //CardContext.Provider 는 context안의 값을 공급하는 컴포넌트
    // { children }은 이 안에 감싸줄 컴포넌트를 의미
    // {children}은 결국 return문 안에서 <CardContext.Provider>로 감싸져서 전역상태(cardData 등)를 하위 컴포넌트들이 사용할 수 있게 함.
  );
};

export const useCard = () => useContext(CardContext);
// 리액트 컨텍스트를 더 편하게 쓰기위한 커스텀 훅
// 커스텀 훅을 안쓰면 index.js에 접근시킬 때 useContext에 import도 시켜야 하고 useContext(CardContext)도 적어줘야함
