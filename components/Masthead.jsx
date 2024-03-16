/** @jsxImportSource @emotion/react */

"use client"

import {css} from "@emotion/react"
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';

const masthead = css`
	font-size:0.8rem;
	color:#aaa;
	text-align:center;
	line-height:1.6;
	display:flex;
	flex-direction:column;
	gap:0.4rem;
	margin-bottom:1rem;
`;
const link = css`
	transition:0.2s;
	&:hover{
		opacity:0.8;
	}
`;

const Masthead =()=>{
    return(
        <div css={masthead}>
            <div> 서강대 ~ 신촌 라인의 맛집들 메뉴만<br/>2,000개 이상 저장되어 있어요. 🤤 </div>
            <a css={[link,{color:'#ff6842'}]} href="https://tally.so/r/w7WNE9" target="_blank" rel="noreferrer noopener">하루만에 반영되는 피드백 주기</a>
            <Tooltip disableFocusListener title="psalm1266@gmail.com" arrow TransitionComponent={Zoom}>
                <span style={{color:'#ccc',cursor:'default'}}>Made by Kim with 🧡</span>
            </Tooltip>
        </div>
    );
}

export default Masthead