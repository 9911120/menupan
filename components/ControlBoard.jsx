/** @jsxImportSource @emotion/react */

"use client"

import { css } from "@emotion/react"
import { Slider } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import Chip from '@mui/material-next/Chip';
import FormControlLabel from '@mui/material/FormControlLabel';
import LoadingButton from '@mui/lab/LoadingButton';


const control_board = css`
	margin:2.2rem 0.8rem 1.5rem 0.8rem;
	padding: 1.2rem 0.8rem 0.8rem 0.8rem;
	border-radius:1.2rem;
	border:1px solid #ffd2c6;
	background:#fff5f3;
	color:#663c00;
`;

const control_board_price_container = css`
	margin-top:1rem;
	display:flex;
	align-items:center;
	gap:0.6rem;
`;
const control_board_chip_label = css`
	color:#663c00;
	font-weight:bold;
`;
const control_board_checkbox_container = css`
	margin-top:1rem;
`;
const control_board_checkbox_label = css`
	font-size:0.9rem;
`;
const control_board_button_container = css`
	margin-top:1rem;
`;

const ControlBoard =({loading, priceRange, handleChangeRange, handleSearch,
    optionBeverage, optionAdd, optionDrink,
    setOptionBeverage, setOptionAdd, setOptionDrink})=>{
    return (
        <div css={control_board}>
            <Slider
                disabled={loading}
                max={31000}
                min={0}
                value={priceRange}
                onChange={handleChangeRange}
                valueLabelDisplay="off"
                step={1000}
                sx={{
                    color: '#ff6842',
                    transition:'0.2s',
                    '& .MuiSlider-valueLabel': {
                        backgroundColor: '#ff6842'
                    },
                    '& .MuiSlider-thumb':{
                        '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
                            boxShadow: '0 0 0 8px rgba(255, 104, 66, 0.16)',
                        },
                    }
                }}
            />
            <div css={control_board_price_container}>
                <b>가격대</b>
                <div>
                    <Chip sx={{background:'#ffddd6'}} variant="filled" size="small" label={<span css={control_board_chip_label}>{(priceRange[0]===31000?"30,000+":priceRange[0].toLocaleString('ko-KR'))+"원"}</span>}/>
                    &nbsp;~ <Chip sx={{background:'#ffddd6'}} variant="filled" size="small" label={<span css={control_board_chip_label}>{(priceRange[1]===31000?"30,000+":priceRange[1].toLocaleString('ko-KR'))+"원"}</span>}/>
                </div>
            </div>
            <div css={control_board_checkbox_container}>
                <FormGroup>
                    <FormControlLabel control={<Checkbox onChange={e=>setOptionBeverage(!e.target.checked)} value={!optionBeverage} disabled={loading} color="default" defaultChecked sx={{color:'#ff6842','&.Mui-checked': { color:'#ff6842'} }} />} label={<span css={control_board_checkbox_label}>음료 제외</span>} />
                    <FormControlLabel control={<Checkbox onChange={e=>setOptionAdd(!e.target.checked)} value={!optionAdd} disabled={loading} color="default" defaultChecked sx={{color:'#ff6842','&.Mui-checked': { color:'#ff6842'} }} />} label={<span css={control_board_checkbox_label}>추가메뉴 제외</span>} />
                    <FormControlLabel control={<Checkbox onChange={e=>setOptionDrink(!e.target.checked)} value={!optionDrink} disabled={loading} color="default" defaultChecked sx={{color:'#ff6842','&.Mui-checked': { color:'#ff6842'} }} />} label={<span css={control_board_checkbox_label}>주류 제외</span>} />
                </FormGroup>
            </div>
            <div css={control_board_button_container}>
                <LoadingButton onClick={handleSearch} loading={loading} variant="contained" sx={{width:'100%',fontSize:'1rem',borderRadius:'0.8rem',backgroundColor:'#ff6842',"&:hover":{backgroundColor:'#ff4d20'}}} disableElevation>검색하기</LoadingButton>
            </div>
        </div>
    )
}

export default ControlBoard;