// // 불러오기
// import Modal from 'react-modal';

// // 모달 스타일
// const 모달스타일 = {
// 	overlay: {
// 		position: "fixed",
// 		top: 0,
// 		left: 0,
// 		right: 0,
// 		bottom: 0,
// 		backgroundColor: "rgba(255, 255, 255, 0.45)",
// 		zIndex: 10,
// 	},
// 	content: {
// 		display: "flex",
// 		justifyContent: "center",
// 		background: "#ffffe7",
// 		overflow: "auto",
// 		top: "42vh",
// 		left: "38vw",
// 		right: "38vw",
// 		bottom: "42vh",
// 		WebkitOverflowScrolling: "touch",
// 		borderRadius: "14px",
// 		outline: "none",
// 		zIndex: 10,
// 	},
// };

// // 사용법
// return (
// 	<>
// 		<Modal 
//     		isOpen={불린값}
// 			style={모달스타일}
// 			onRequestClose={모달토글핸들러} // 오버레이나 esc를 누르면 핸들러 동작
// 			ariaHideApp={false}
//     	>
//     		모달 내용 or 컴포넌트
//     	</Modal>
//         <button onClick={모달토글핸들러}></button>
//     </>
// )