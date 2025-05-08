import { useRef, useEffect } from "react";
import { useCard } from "../context/CardContext";
import Card from "./Card";

const App = ({ selectedCategory }) => {
  // ================================================================================
  // 최하단 객체 생성시 이벤트를 위한 useRef

  const bottomRef = useRef(null);
  // useRef : 일반적으로 특정 DOM을 지정해서 해당 속성값을 파악하거나 변경시키는 용도로 주로 사용
  // 초기 렌더링 시점에 참조할 DOM 요소가 아직 생성되지 않았기 때문에 null값을 기존값으로 생성

  // context폴더 생성하면 cardcontext에서 관리되도록 옮겨주기
  // 그리고 cardData, addCards 데이터 전역에서 가져오게 처리
  const { cardData, addCard } = useCard(); // 전역 데이터 가져오기

  // --------------------------------------------------------------------
  // 선택된 카테고리로 필터링
  // selectedCategory 값에따라 cardData 배열을 필터링 해서 세로운 배열을 생성하는 로직

  const filteredData =
    selectedCategory === "전체" // selectedCategory가 전체인지 확인하고
      ? cardData // 참인경우 cardData를 필터링하지않고 그대로 출력
      : cardData.filter((data) => {
          return data.category === selectedCategory;
        });
  // 거짓일 경우, cardData 필터링
  // filter 메서드 사용해서 cardData 배열에서 category가 selectedCategory와 일치하는 항목만 남김

  // 무한 스크롤 => IntersectionObserver 사용해서 브라우저 최적화를 효율적을로 관리하게끔 처리(요소가 중간에만 보여도 작동 할 수있음 )

  useEffect(() => {
    const obsever = new IntersectionObserver(
      // IntersectionObserver 는 : 브라우저에 내장된 API 어떤 요소가 화면에 보이는지 감지할 수 있는 기능
      (entries) => {
        const [entry] = entries;
        // entries의 여러 요소중 첫번째 요소만 받겠다.
        // const entry = entries[0] => 근데 구조분해로 사용하면 코드가 간결

        if (entry.isIntersecting) {
          addCard(); // 요소가 화면에 들어오면 카드 추가
        }
      },
      {
        root: null,
        // root는 어떤 영역을 기준으로 감지할 지 설정하는 요소
        // null은 viewport기준이 됨.
      }
    );

    const target = bottomRef.current;
    if (target) obsever.observe(target); // target요소가 화면에 나타나는지 감시(관찰) 시작

    return () => {
      // useEffect 훅 안에 return 문 함수를 넘기면, 컴포넌트가 언마운트될 때, 또는 의존성 배열이 바뀔때 이 함수가 자동으로 실행됨.
      if (target) obsever.unobserve(target); // 컴포넌트가 사라지거나 리렌더링 될 때 감시(관찰) 해제(메모리 누수 방지 + 성능 최적화)
    };
  }, [bottomRef, addCard]);
  // 배열안에 있는 값이 변경될 때 만 useEffect안의 코드가 실행됨

  return (
    <>
      <div className="container_wrap">
        <div className="flex_box">
          {/* 필터링을 하기위해 설정해둔 filteredData 를  cardData에서 대체하면서
          key값도 고유 id값으로 변경 */}
          {filteredData.map((data) => {
            return (
              <Card
                key={data.id} // 필터링할때 cardData 정의한 id로 설정 변경
                // 리액트에서 리스트 렌더링 할 때는 각 항목마다 고유한 key가 필요
                // 성능 최적화와 오류 방지를 위해 index대신 data,id를 사용함.
                {...data}
                // Spread 전달로 filterData정보 모두 전부 props로 받음 깔끔하고 유지보수 쉬움
                //props명시가 중요한 상황이 아닐 때 Spread 전달이 좋음
              />
            );
          })}

          {/* 빈 div에 bottomRef 추가해서 스크롤 될 위치 선정  */}
          <div ref={bottomRef}></div>
          {/* ref는 DOM요소나 리액트 컴포넌트의 직접 접근할 수 있게 도와주는 리액트의 기능 */}
        </div>
      </div>
    </>
  );
};

export default App;
