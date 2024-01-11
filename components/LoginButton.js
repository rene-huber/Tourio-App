import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { StyledLink } from "../components/StyledLink.js";
import styled from "styled-components";
import Image from "next/image.js";

const FixedLink = styled(StyledLink)`
  position: absolute;
  top: 50px;
  right: 50px;
  z-index: 1;
`;

export default function LoginButton() {
  const { data: session } = useSession();
  console.log(session);
  if (session) {
    return (
      <>
        <Image src={session.user.image} width={40} height={40} alt="profile pic" />
        <p>
          Signed in as {session.user.email} <br />
        </p>
        <FixedLink onClick={() => signOut()}>Sign out</FixedLink>
      </>
    );
  }
  return (
    <>
      {/* Not signed in <br /> */}
      <FixedLink onClick={() => signIn("github")}>Sign in</FixedLink>
    </>
  );
}
