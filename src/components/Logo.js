import React from 'react'
import { useStyles } from '../styles'

const Logo = (props) => {
    const styles = useStyles();
    return (
        <img src="/images/logo.png" alt="Food Order" className={props.large ? styles.largeLogo : styles.Logo}></img>
    )
}

export default Logo
