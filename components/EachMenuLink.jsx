/** @jsxImportSource @emotion/react */

"use client"

import {css} from "@emotion/react"
import Image from "next/image";
import Chip from '@mui/material-next/Chip';

const control_board_chip_label = css`
	color:#663c00;
	font-weight:bold;
`;
const each_menu = css`
	padding:0.8rem 0.8rem 1rem 0.8rem;
	border:0.5px solid #eee;
	border-radius:0.8rem;
	transition:all 200ms ease-in 0s;
	&:hover{
		transform: translateY(-0.4rem);
    	box-shadow: rgba(0, 0, 0, 0.1) 0 5px 24px;
	}
	@media (max-width:700px){
		border-radius:0;
		border-left:0;
		border-right:0;
	}
`;
const each_menu_photo = css`
	width:100%;
	border-radius:0.6rem;
	margin-bottom:0.4rem;
`;
const each_menu_info_container = css`
	margin-top:0.4rem;
	display:flex;
	justify-content:space-between;
	padding:0 0.2rem;
	align-items:center;
`;
const each_menu_price = css`
	color:#663c00;
	font-size:1.8rem;
	font-family: "WAGURITTF", sans-serif;
`;
const each_menu_names_container = css`
	font-size:0.9rem;
	display:flex;
	flex-direction:column;
	align-items:flex-end;
	gap:0.4rem;
`;
const each_menu_name_restaurant = css`
	font-size:0.8rem;
	color:#888;
	margin-right:0.2rem;
`;

const EachMenuLink =({e,i})=>{
    return(
        <a href={`https://m.place.naver.com/restaurant/${e.restaurants.naver_id}/home`} target="_blank" rel="noreferrer noopener">
            <div css={each_menu}>
                {e.photo_url && <Image width={500} height={500} css={each_menu_photo} src={e.photo_url} alt="menu_photo"/>}
                <div css={each_menu_info_container}>
                    <div css={each_menu_price}>{e.price.toLocaleString()}원</div>
                    <div css={each_menu_names_container}>
                        <Chip sx={{background:'#ffddd6',height:'1.8rem'}} variant="filled" size="small" label={<span css={[control_board_chip_label,{fontSize:'1rem'}]}>{e.name}</span>}/>
                        <div css={each_menu_name_restaurant}>{e.restaurants.name} ({e.restaurants.category})</div>
                    </div>
                </div>
            </div>
        </a>
    );
}

export default EachMenuLink;