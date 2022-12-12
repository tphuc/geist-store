'use client';
import { useEffect } from "react";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { styled } from "@stitches/react";

const Title = styled('h1', {
    width: "100%"
})

const Word = styled(motion.span, {
    display: "inline-block",
    marginRight: "0.25em",
    whiteSpace: "nowrap",
})
const Character = styled(motion.span, {
    display: "inline-block",
    // marginRight:"-0.5em"
})

export default function AnimatedTitle({ 
    text = 'Animated Text',
    wordAnimation = {
        hidden: {
            opacity: 0,
            y: `1em`,
        },
        visible: {
            opacity: 1,
            y: `0em`,
            transition: {
                duration: 1,
                ease: [0.5, 0.01, -0.05, 0.9]
            },
        },
    },
    characterAnimation = {
        hidden: {},
        visible: {},
    },
    css,
    style,
}) {


    const ctrls = useAnimation();

    const { ref, inView } = useInView({
        threshold: 0.5,
        triggerOnce: true,
    });

    useEffect(() => {
        if (inView) {
            ctrls.start("visible");
        }
        if (!inView) {
            ctrls.start("hidden");
        }
    }, [ctrls, inView]);


    useEffect(() => {
        ctrls.start("visible");
    }, [text])


    return (
        <Title css={css} style={style} aria-label={text} role="heading">
            {text.split(" ").map((word, index) => {
                return (
                    <Word
                        ref={ref}
                        aria-hidden="true"
                        key={index}
                        initial="hidden"
                        animate={ctrls}
                        variants={wordAnimation}
                        transition={{
                            delayChildren: 0.6,
                            staggerChildren: 0.04,
                            staggerDirection: -1,
                            ease: [0.5, 0.01, -0.05, 0.9]
                        }}
                    >
                        {word.split("").map((character, index) => {
                            return (
                                <Character
                                    aria-hidden="true"
                                    key={index}
                                    variants={characterAnimation}
                                >
                                    {character}
                                </Character>
                            );
                        })}
                    </Word>
                );
            })}
        </Title>
    );
}