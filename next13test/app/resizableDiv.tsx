"use client";

import React from "react"
import {Container, Bar, Section} from "../resizer"


export const ResizableDiv = () => {
    return (
        <Container style={{position: "relative", height: `${100}px`}}>
            <Section 
                style={{ overflow: "scroll", background: 'rgb(240, 240, 240)' }} 
                minSize={100}
                synthKey={"ID_0"}>
            </Section>
            <Bar 
                size={10} 
                style={{ background: '#738228', cursor: 'col-resize' }} 
                synthKey={"ID_1"}
                />
            <Section style={{ 
                background: 'rgb(240, 240, 240)', 
                display: "flex", 
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                overflow: "scroll"
                }} 
                minSize={100}
                synthKey={"ID_2"}
            >
            </Section>
        </Container>
    );
}

export const DumbResizableDiv = () => {

}
