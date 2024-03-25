import React from 'react'

type Props = {
    percentage: number;
}

const UploadPercent: React.FC<Props> = ({ percentage }) => {
    const containerStyles = {
        height: 20,
        width: '100%',
        backgroundColor: "#e0e0de",
        borderRadius: 50,
        margin: "0, auto"
    }

    const fillerStyles = {
        height: '100%',
        width: `${percentage}%`,
        backgroundColor: 'green',
        borderRadius: 'inherit'
    }

    const labelStyles = {
        padding: 5,
        color: 'white',
        fontWeight: 'bold'
    }

    return (
        <div style={containerStyles} className='dark:bg-white bg-black'>
            <div style={fillerStyles} className='dark:bg-white bg-black'>
                <span style={labelStyles}>{`${percentage.toFixed(2)}%`}</span>
            </div>
        </div>
    );

}

export default UploadPercent