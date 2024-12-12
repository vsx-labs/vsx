import { NavList } from '@primer/react';
import { Link } from '@tanstack/react-router';

export const SideNav = () => {
    return (
        <NavList aria-label="Repository">
            {/* <NavList.LeadingVisual>Sections</NavList.LeadingVisual> */}
            <SideNavItem label='Home' to='home'></SideNavItem>
            <SideNavItem label='About' to='about'></SideNavItem>
            <NavList.Group>
                <NavList.GroupHeading>Solana</NavList.GroupHeading>
                <SideNavItem label='Validators' to='validators'></SideNavItem>
            </NavList.Group>
            {/* <NavList.LeadingVisual>More detail</NavList.LeadingVisual> */}
        </NavList>
    );
};

type SideNavItemProps = {
    label: string;
    to: string;
};

const SideNavItem = ({ label, to }: SideNavItemProps) => {
    return (
        <Link to={to} className="side-nav-item">
            {({ isActive }) => {
                return (
                    <NavList.Item key={to} aria-current={isActive ? 'page' : 'false'}>
                        {label}
                    </NavList.Item>
                );
            }}
        </Link>
    );
};