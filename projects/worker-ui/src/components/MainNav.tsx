import { CpuIcon, GearIcon, LogoGithubIcon } from '@primer/octicons-react';
import { Breadcrumbs, Button, IconButton, LinkButton, PageHeader, Stack, UnderlineNav } from '@primer/react';
import { Link } from '@tanstack/react-router';

export const MainNav = () => {
    return (
        <>
            <PageHeader>
                <PageHeader.TitleArea>
                    <PageHeader.Title>
                        <Breadcrumbs>
                            <Stack direction='horizontal' align='center'>
                                <Stack.Item>
                                    <CpuIcon size={22} />
                                </Stack.Item>
                                <Stack.Item> / </Stack.Item>
                                <Stack.Item> vsx.dev </Stack.Item>
                                <Stack.Item> / </Stack.Item>
                                <Stack.Item> solana </Stack.Item>
                            </Stack>
                        </Breadcrumbs>
                    </PageHeader.Title>
                </PageHeader.TitleArea>
                <PageHeader.Actions sx={{ float: 'right' }}>
                    <LinkButton href='https://github.com/vsxdotdev' leadingVisual={LogoGithubIcon}></LinkButton>
                </PageHeader.Actions>
                <PageHeader.Navigation sx={{ width: '100%' }}>
                    <UnderlineNav aria-label="Repository">
                        <MainNavItem label='Home' to='home'></MainNavItem>
                        <MainNavItem label='About' to='about'></MainNavItem>
                        <MainNavItem label='Epoch' to='epoch'></MainNavItem>
                        <MainNavItem label='Validators' to='validators'></MainNavItem>
                    </UnderlineNav>
                </PageHeader.Navigation>
            </PageHeader>
        </>
    );
};

type MainNavItemProps = {
    label: string;
    to: string;
};

const MainNavItem = ({ label, to }: MainNavItemProps) => {
    return (
        <Link to={to} className="main-nav-item">
            {({ isActive }) => {
                return (
                    <UnderlineNav.Item key={to} aria-current={isActive ? 'page' : 'false'}>
                        {label}
                    </UnderlineNav.Item>
                );
            }}
        </Link>
    );
};