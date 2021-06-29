import React from 'react'
import { useStyles } from '../styles'

const Logo = () => {
    const styles = useStyles();
    return (
        <img src="/images/logo.png" alt="Food Order" className={styles.largeLogo}></img>
    )
}

export default Logo
