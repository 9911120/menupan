/** @jsxImportSource @emotion/react */

"use client"

import {css} from "@emotion/react"
import Image from "next/image";
import Chip from '@mui/material-next/Chip';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

const control_board_chip_label = css`
	color:#000;
	font-weight:bold;
    font-family:'Pretendard',sans-serif;
`;
const each_menu = css`
	padding:0.8rem 0 1rem 0;
	border:0.5px solid #222;
	border-radius:0.8rem;
	transition:all 200ms ease-in 0s;
	text-align:center;
	&:hover{
		transform: translateY(-0.4rem);
    	box-shadow: rgba(250, 121, 45, 0.2) 0 5px 24px;
		@media (max-width:700px){
			transform: unset;
			box-shadow: unset;
		}
	}
	@media (max-width:700px){
		border-radius:0;
		border-left:0;
		border-right:0;
		border-top:0;
	}
`;
const each_menu_photo = css`
	width:calc(100% - 1.6rem);
	height:100% !important;
	border-radius:0.6rem;
	margin-bottom:0.4rem;
	@media (max-width:700px){
		border-radius:0;
		width:100%;
	}
`;
const each_menu_info_container = css`
	margin-top:0.4rem;
	display:flex;
	justify-content:space-between;
	padding:0 1rem;
	align-items:center;
`;
const each_menu_price = css`
	color:#FA792D;
	font-size:1.8rem;
	font-family: "WAGURITTF", sans-serif;
	text-align:left;
`;
const each_menu_cleck_notice = css`
	font-size:0.8rem;
	font-family:'Pretendard',sans-serif;
	margin-top:0.6rem;
	display:none;
`;
const each_menu_names_container = css`
	font-size:0.9rem;
	display:flex;
	flex-direction:column;
	align-items:flex-end;
	gap:0.5rem;
`;
const each_menu_name_restaurant = css`
	font-size:0.8rem;
	color:#fff;
	margin-right:0.1rem;
`;
const each_menu_rate = css`
	color:#FFF;
	font-weight:600;
	display:flex;
	align-items:center;
	gap:0.1rem;
	font-size:0.8rem;
	margin-right:0.1rem;
`;
const each_menu_review = css`
	color:#F3C600;
	font-size:0.8rem;
	margin-right:0.1rem;
`;

const EachMenuLink =({e,i})=>{
    return(
        <a href={e.restaurants.kakao_id ? `https://place.map.kakao.com/m/${e.restaurants.kakao_id}` : `https://m.place.naver.com/restaurant/${e.restaurants.naver_id}/home`} target="_blank" rel="noreferrer noopener">
            <div css={each_menu}>
                {e.photo_url && <Image quality={55} placeholder="blur" blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mOUqwcAAMEAnwarUJAAAAAASUVORK5CYII=" width={500} height={500} css={each_menu_photo} src={e.photo_url} alt="menu_photo"/>}
                <div css={each_menu_info_container}>
                    <div css={each_menu_price}>
						<div>{e.price.toLocaleString()}원</div>
						<div css={each_menu_cleck_notice}>클릭하시면 카카오맵 페이지로 연결돼요.</div>
					</div>
                    <div css={each_menu_names_container}>
                        <Chip sx={{background:'#ffddd6',height:'1.8rem'}} variant="filled" size="small" label={<span css={[control_board_chip_label,{fontSize:'1rem'}]}>{e.name}</span>}/>
                        <div css={each_menu_name_restaurant}>{e.restaurants.name} ({e.restaurants.category})</div>
						<div css={each_menu_rate}>
							{e.restaurants.kakao_rate_score && <Rating size="small" name="read-only" precision={0.1} value={e.restaurants.kakao_rate_score} emptyIcon={<StarIcon style={{ color:'#444' }} fontSize="inherit" />} readOnly />}
							<div>{e.restaurants.kakao_rate_score ? `${e.restaurants.kakao_rate_score}점 (${e.restaurants.kakao_rate_number})` : "별점 정보 없음"}</div>
						</div>
						<div css={each_menu_review}>
							{e.restaurants.kakao_review_number ? <span>카카오맵 리뷰 <b style={{textDecoration:'underline'}}>{e.restaurants.kakao_review_number}</b>개</span> : "리뷰 정보 없음"}
						</div>
                    </div>
                </div>
            </div>
        </a>
    );
}

export default EachMenuLink;