import navLinks from './links'
import adminNavLinks from './admin_links'

const navigations = {
    'admin': adminNavLinks,
    'guest': navLinks
}

const getLinks = (type) => {
    return ((type === 'admin') ? navigations[type] : navigations['guest'])
}

export default getLinks
