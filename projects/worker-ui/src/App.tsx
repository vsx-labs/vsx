import './App.css'
import { ThemeProvider, BaseStyles, Box } from '@primer/react'
import { WelcomeHeader } from './WelcomeHeader'

function App() {
  return (
    <ThemeProvider>
      <BaseStyles>
        <Box
          sx={{
            mx: 'auto',
            width: '100%',
          }}
        >
          <Box
            sx={{
              position: 'sticky',
              top: 0,
              height: 64,
              display: 'grid',
              zIndex: 1000,
            }}
          >
            <WelcomeHeader />
          </Box>
          <Box sx={{ padding: '40px', margin: '10px 90px' }}>
            children
          </Box>
        </Box>
      </BaseStyles>
    </ThemeProvider>
  )
}

// function AppHeader() {
//   return (
//     <PageLayout.Header

//       sx={{
//         width: "100%",
//         border: "1px solid rgba(0,0,0,0.08)",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         height: "100px",
//         fontSize: "28px",
//       }}
//     >
//       <PageLayout.Content>
//         <Header>
//           <Header.Item>
//             <Header.Link
//               href="#"
//               sx={{
//                 fontSize: 2,
//               }}
//             >
//               <span>GitHub</span>
//             </Header.Link>
//           </Header.Item>
//           <Header.Item full>Menu</Header.Item>
//           <Header.Item
//             sx={{
//               mr: 0,
//             }}
//           >
//             <Avatar
//               src="https://github.com/octocat.png"
//               size={20}
//               square
//               alt="@octocat"
//             />
//           </Header.Item>
//         </Header>
//       </PageLayout.Content>
//     </PageLayout.Header>
//   )
// }

// function LeftPane() {
//   return (
//     <PageLayout.Pane
//       position="start"
//       aria-label="Secondary navigation"
//       sx={{
//         border: "1px solid rgba(0,0,0,0.08)",
//         fontSize: "20px"
//       }}
//     >
//       <NavList>
//         <NavList.Item
//           href="#"
//           aria-current="page"
//           sx={{ fontSize: "20px" }}
//         >
//           Home
//         </NavList.Item>
//         <NavList.Item href="#about" sx={{ fontSize: "20px" }}>
//           About
//         </NavList.Item>
//         <NavList.Item href="#contact" sx={{ fontSize: "20px" }}>
//           Contact
//         </NavList.Item>
//       </NavList>
//     </PageLayout.Pane>
//   );
// }

// function ContentPane() {
//   return (
//     <PageLayout.Content
//       sx={{
//         border: "1px solid rgba(0,0,0,0.08)",
//         height: "60vh",
//         fontSize: "28px",
//       }}
//     >
//       <Box
//         bg="bg.primary"
//         display="flex"
//         justifyContent="center"
//         alignItems="center"
//         height="100%"
//       >
//         <Text> Content </Text>
//       </Box>
//     </PageLayout.Content>
//   );
// }
// function Footer() {
//   return (
//     <PageLayout.Footer
//       sx={{
//         border: "1px solid rgba(0,0,0,0.08)",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         height: "100px",
//         fontSize: "28px",
//         pb: "20px",
//       }}
//     >
//       <Text height={64}> Footer! </Text>
//     </PageLayout.Footer>

//   )
// }


export default App
