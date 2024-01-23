import styled from "styled-components";
import { FaListUl } from 'react-icons/fa'
import HeaderImg from '../../assets/header-img.jpg'

const HeaderContainer = styled.header`
    background: url(${HeaderImg}) no-repeat center center;
    width: 100vw;
    height: 250px;
    display: flex;
    justify-content: center;
`

const TextHeaderContainer = styled.div`
    width: 60%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: white;
    font-size: 2em;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 5px;
    margin: 0;

    h1 {
        margin-bottom: 55px;
    }
`

function Header() {
    return (
        <HeaderContainer>
            <TextHeaderContainer>
                <h1>To do</h1>
                <FaListUl />
            </TextHeaderContainer>
        </HeaderContainer>
    )
}

export default Header;