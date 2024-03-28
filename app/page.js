/** @jsxImportSource @emotion/react */

"use client"

import { css } from "@emotion/react";
import { useEffect, useState, useRef, useCallback } from "react";
import { motion,AnimatePresence } from 'framer-motion'
import { createClient } from '@supabase/supabase-js'
import { styled } from "@mui/material";
import Alert from '@mui/material/Alert';
import Modal from "@mui/material/Modal";
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import ControlBoard from "@/components/ControlBoard";
import EachMenuLink from "@/components/EachMenuLink";
import Masthead from "@/components/Masthead";

const main = css`
	width:100%;
	min-height:100vh;
	display:flex;
	flex-direction:row;
	justify-content:center;
	@media (max-width:700px){
		flex-direction:column;
		align-items:center;
		justify-content:unset;
	}
`;
const left_view = css`
	position: sticky;
	top:0;
	align-self:flex-start;
	max-width:320px;
	width:100%;
	height:100vh;
	border-left:0.5px solid #222;
	padding-top:3rem;
	@media (max-width:700px){
		max-width:450px;
		width:100%;
		position:relative;
		top:unset;
		align-self:unset;
		height:auto;
		border:0;
	}
`;
const app_title = css`
	text-align:center;
	font-size:2rem;
	font-family: "WAGURITTF", sans-serif;
	color:#ff6842;
	font-weight:normal;
`;
const control_board_floating = css`
	@media (min-width:701px){display:none;}
	position:fixed;
	max-width:450px;
	width:96%;
	top:8px;
	left:0;
	right:0;
	margin:auto;
	border-radius:0.8rem;
	background:rgba(250,121,45,0.9);
	backdrop-filter: blur(10px) saturate(200%) contrast(100%) brightness(120%);
    -webkit-backdrop-filter: blur(10px) saturate(200%) contrast(100%) brightness(120%);
	padding:0.8rem;
	color:#fff;
	z-index:999;
	box-shadow: rgba(0, 0, 0, 0.2) 0 10px 10px;
	display:flex;
	align-items:center;
	justify-content:space-between;
	gap:0.4rem;
	cursor:pointer;
`;
const right_view = css`
	max-width:450px;
	width:100%;
	border-left:0.5px solid #222;
	border-right:0.5px solid #222;
	padding:0.8rem 0 5rem 0;
    overflow-y: scroll;
	@media (max-width:700px){
		text-align:center;
		border:0;
	}
`;
const menus_container = css`
	display:flex;
	flex-direction:column;
	gap:0.8rem;
	margin-top:1rem;
	padding:0 0.8rem;
	@media (max-width:700px){
		padding:0;
	}
`;
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
	margin: '0 0.8rem',
	height: 10,
	borderRadius: '0.8rem',
	borderTopLeftRadius: 0,
	borderTopRightRadius: 0,
	[`&.${linearProgressClasses.colorPrimary}`]: {
		backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
	},
	[`& .${linearProgressClasses.bar}`]: {
		borderRadius: '0.8rem',
		backgroundColor: theme.palette.mode === 'light' ? '#ff6842' : '#ff6842',
	},
}));

function getRandomIdsArray() {
	var ids = [];
	var min = 1;
	var max = 2100;
	while (ids.length < 100) {
		var randomId = Math.floor(Math.random() * (max - min + 1)) + min;
		if (!ids.includes(randomId)) {
			ids.push(randomId);
		}
	}
	return ids;
}

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL,process.env.NEXT_PUBLIC_SUPABASE_KEY)


export default function Home() {

	const [list,setList] = useState([]);
	const [priceRange,setPriceRange] = useState([3000,12000]);
	const [optionBeverage,setOptionBeverage] = useState(false);
	const [optionAdd,setOptionAdd] = useState(false);
	const [optionDrink,setOptionDrink] = useState(false);
	const [loading,setLoading] = useState(false);
	const [hiddenOnScroll, setHiddenOnScroll] = useState(true);
	const [openModal, setOpenModal] = useState(false);
	const observer = useRef();

	const handleOpenModal = () => setOpenModal(true);
	const handleCloseModal = () => setOpenModal(false);
	const handleChangeRange =(event,newValue)=>{
		setPriceRange(newValue);
	}

	const getSearchOptions =()=>{
		let arr = ['default'];
		optionBeverage && arr.push('beverage');
		optionAdd && arr.push('add');
		optionDrink && arr.push('drink');
		return arr;
	}

	const handleSearch =()=>{
		window.scrollTo({top: 0});
		openModal && handleCloseModal();
		setLoading(true);
		handleFetch('push');
	}

	const handleFetch = useCallback(async (type)=>{
		let { data: menus, error } = await supabase
			.from('menus')
			.select(`id, name, price, photo_url, restaurants(name, category, naver_id, kakao_id, kakao_rate_score, kakao_rate_number, kakao_review_number)`)
			.gte('price', priceRange[0]!==31000?priceRange[0]:30000)
			.lte('price', priceRange[1]!==31000?priceRange[1]:1000000)
			.in('category',getSearchOptions())
			.in('id',getRandomIdsArray())
			.limit(20);
		if (type === 'push') {
			setList(menus);
		} else if (type === 'auto'){
			setList(prevList => [...prevList, ...menus]);
		}
		setLoading(false);
	},[priceRange,getSearchOptions,getRandomIdsArray])

	const bottomRef = useCallback(
		(node) => {
			if (observer.current) observer.current.disconnect();
			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting) {
					handleFetch('auto');
				}
			});
			if (node) observer.current.observe(node);
		},
		[handleFetch]
	);

	const handleScroll = () => {
		const position = window.scrollY;
		position > 500 ? setHiddenOnScroll(false) : setHiddenOnScroll(true)
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);
	

	return (
		<main css={main}>
			<div css={left_view}>
				<h1 css={app_title}>신촌 메뉴판</h1>
				<ControlBoard {...{loading, priceRange, handleChangeRange, handleSearch,
    optionBeverage, optionAdd, optionDrink,
    setOptionBeverage, setOptionAdd, setOptionDrink}}/>
				<AnimatePresence>
				{
					!hiddenOnScroll &&
					<motion.div key="header" initial={{y:-50}} animate={{y:0}} exit={{y:-50}} transition={{bounce:0}} css={control_board_floating} onClick={handleOpenModal}>
						<span style={{fontFamily:'WAGURITTF'}}>신촌메뉴판</span>
						<div>{priceRange[0].toLocaleString()}원 ~ {priceRange[1].toLocaleString()}원</div>
					</motion.div>
				}
				</AnimatePresence>
				<AnimatePresence>
				{
					openModal &&
					<Modal
						component={motion.div}
						exit={{opacity:0}}
						key="modal"
						open={openModal}
						onClose={handleCloseModal}
						aria-labelledby="modal-modal-title"
						aria-describedby="modal-modal-description"
					>
						<motion.div initial={{y:-400}} animate={{y:0}} exit={{y:-400}}>
							<ControlBoard {...{loading, priceRange, handleChangeRange, handleSearch,
								optionBeverage, optionAdd, optionDrink,
								setOptionBeverage, setOptionAdd, setOptionDrink}}/>
						</motion.div>
					</Modal>
				}
				</AnimatePresence>
				<Masthead/>
			</div>
			<div css={right_view}>
				<Alert severity="info" color="warning" sx={[{alignItems:'center',transition:'0.2s',borderRadius:'0.8rem',backgroundColor:'#1e0500',border:'1px solid #83493a',color:'#fff',margin:'0 0.8rem',fontFamily:'Pretendard',textAlign:'left'},loading && {borderBottomLeftRadius:0,borderBottomRightRadius:0}]}>메뉴를 클릭하시면 카카오맵 페이지가 열립니다.<br/>별점/리뷰 수 데이터는 카카오맵 기준입니다.<br/><span style={{opacity:'0.4'}}>3월 17일 00시 기준</span></Alert>
				{ loading && <BorderLinearProgress/> }
				<div css={menus_container}>
				{ (!loading && list) && list.map((e,i)=> {
					return (
						<div key={e.id.toString()+i}>
							{(i%12===0&&i!==0)&&
								<iframe
									style={{
										width:'100%',
										maxWidth:'inherit',
										marginBottom:'0.8rem',
										borderRadius:'0.4rem'
									}}
									src="https://ads-partners.coupang.com/widgets.html?id=663849&template=carousel&trackingCode=AF2582906&subId=&width=680&height=140&tsource="
									width="680"
									height="140"
									frameBorder="0"
									scrolling="no"
									referrerPolicy="unsafe-url"
									browsingtopics
								/>
							}
							<EachMenuLink {...{e,i}}/>
						</div>
					)
				} ) }
				</div>
				{list.length!==0 && <div ref={bottomRef}/>}
			</div>
		</main>
	);
}
