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
	height:calc(100vh - 3rem);
	border-left:0.5px solid #eee;
	padding-top:3rem;
	@media (max-width:700px){
		max-width:450px;
		width:100%;
		position:relative;
		top:unset;
		align-self:unset;
		height:auto;
		border-right:0.5px solid #eee;
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
	width:100%;
	top:0;
	left:0;
	right:0;
	margin:auto;
	background:#ff6842;
	padding:0.8rem;
	color:#FFF;
	z-index:999;
	box-shadow: rgba(255, 255, 255, 1) 0 10px 10px;
	display:flex;
	align-items:center;
	gap:0.4rem;
	cursor:pointer;
`;
const right_view = css`
	max-width:450px;
	width:100%;
	border-left:0.5px solid #eee;
	border-right:0.5px solid #eee;
	padding:0.8rem 0 5rem 0;
    overflow-y: scroll;
	@media (max-width:700px){
		text-align:center;
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
			.select(`id, name, price, photo_url, restaurants(name, category, naver_id)`)
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
							<b style={{fontFamily:'WAGURITTF'}}>신촌메뉴판</b>
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
				<Alert severity="info" color="warning" sx={[{transition:'0.2s',borderRadius:'0.8rem',backgroundColor:'#fff5f3',margin:'0 0.8rem',fontFamily:'Pretendard'},loading && {borderBottomLeftRadius:0,borderBottomRightRadius:0}]}>정확한 메뉴 정보는 클릭해서 확인할 수 있어요.</Alert>
				{ loading && <BorderLinearProgress/> }
				<div css={menus_container}>
				{ (!loading && list) && list.map((e,i)=> { return <EachMenuLink key={e.id.toString()+i} {...{e,i}}/> } ) }
				</div>
				{list.length!==0 && <div ref={bottomRef}/>}
			</div>
		</main>
	);
}
