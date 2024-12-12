import { Link } from '@tanstack/react-router';

export const SideNav = () => {
    return (
        <div>SIDE NAV</div>
        // <NavList aria-label="Repository">
        //     {/* <NavList.LeadingVisual>Sections</NavList.LeadingVisual> */}
        //     <SideNavItem label='Home' to='home'></SideNavItem>
        //     <SideNavItem label='About' to='about'></SideNavItem>
        //     <NavList.Group>
        //         <NavList.GroupHeading>Solana</NavList.GroupHeading>
        //         <SideNavItem label='Validators' to='validators'></SideNavItem>
        //     </NavList.Group>
        //     {/* <NavList.LeadingVisual>More detail</NavList.LeadingVisual> */}
        // </NavList>
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
                    <span key={to} aria-current={isActive ? 'page' : 'false'}>
                        {label}
                    </span>
                );
            }}
        </Link>
    );
};