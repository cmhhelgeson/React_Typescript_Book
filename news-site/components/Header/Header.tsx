import Link from "next/link";

import { Center } from "../Center";
import { Container, Logo } from "./style";

const s: string = "What's Next?!"

export const Header = () => {
    return (
        <Container>
            <Center>
                <Logo>
                    <Link href="/">
                        <a>{s}</a>
                    </Link>
                </Logo>
            </Center>
        </Container>
    )
}