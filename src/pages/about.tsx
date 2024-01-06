import RootLayout from '@/layout'
import React from 'react'

type Props = {}

const About = (props: Props) => {
    return (
        <div>about</div>
    )
}

export default About

About.getLayout = function getLayout(page: React.ReactElement) {
    return (
        <div>
            <RootLayout>
                {page}
            </RootLayout>
        </div >
    )
}