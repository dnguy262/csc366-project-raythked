<<<<<<< HEAD
import { Container } from "@mui/material";
import { useRouter } from "next/router";
import { PropsWithChildren } from "react"
import { Navbar } from "../navbar/main.navbar";

type Props = PropsWithChildren<{}>;

export const MatchrPage = ({children}: Props) => {
    const router = useRouter();

    return (<Container maxWidth="xl">
        <Navbar currentPage={router.pathname.slice(1)}/>
        {children}
    </Container>)
=======
import { Container } from "@mui/material";
import { useRouter } from "next/router";
import { PropsWithChildren } from "react"
import { Navbar } from "../navbar/main.navbar";

type Props = PropsWithChildren<{}>;

export const MatchrPage = ({children}: Props) => {
    const router = useRouter();

    return (<Container maxWidth="xl" sx={{mt: 4, mb: 8}}>
        <Navbar currentPage={router.pathname.slice(1)}/>
        {children}
    </Container>)
>>>>>>> 33d4940771308b5212db374967b7801889603955
}