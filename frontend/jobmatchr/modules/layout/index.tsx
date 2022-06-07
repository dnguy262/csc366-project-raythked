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
}