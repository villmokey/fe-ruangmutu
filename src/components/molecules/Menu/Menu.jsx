import { Menu as AntdMenu } from 'antd';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

const { SubMenu } = AntdMenu;  

const propTypes = {
  defaultSelectedKeys: PropTypes.array,
  defaultOpenKeys: PropTypes.array,
  menuItems: PropTypes.array,
  mode: PropTypes.string,
  // inlineCollapsed: PropTypes.bool
}

export const Menu = ({
  defaultSelectedKeys,
  defaultOpenKeys,
  menuItems,
  mode,
  className,
  style
  // inlineCollapsed
}) => {

  // for the key, use "_" for submenu
  // e.g submenu_sponsor

  return (
    <AntdMenu
      defaultSelectedKeys={defaultSelectedKeys}
      defaultOpenKeys={defaultOpenKeys}
      mode={mode}
      className={className}
      style={style}
    >
      {
        menuItems &&
        menuItems?.map(item => {
          let splitKey = item.key.split('_');
          if (splitKey.length > 1) {
            return (
              <SubMenu key={item.key} title={item.title ?? ''} icon={item?.icon}>
                {
                  item.children &&
                  item.children.map(child => (
                    <AntdMenu.Item key={child.key} icon={child?.icon} style={child.style ?? {}}>
                      <Link to={child.url}>
                        { child.content ? child.content : child.title }
                      </Link>
                    </AntdMenu.Item>
                  ))
                }
              </SubMenu>
            )
          } else {
            return (
              <AntdMenu.Item key={item.key} icon={item?.icon} style={item.style ?? {}}>
                <Link to={item.url}>
                  { item.content ? item.content : item.title }
                </Link>
              </AntdMenu.Item>  
            )
          }
        })
      }
    </AntdMenu>
  )
}

Menu.propTyeps = propTypes;


