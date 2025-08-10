export const adminSideMenu = [
    {
        icon: "fa-solid fa-chart-simple", 
        name: 'Dashboard',
        path: '/admin/dashboard'
    },
    {
        icon: "fa-solid fa-couch", 
        name: 'Inventory',
        path: '/admin/inventory'
    },
    {
        icon: "fa-solid fa-receipt", 
        name: 'Orders',
        path: '/admin/orders'
    },
    {
        icon: "fa-solid fa-money-bill-wave", 
        name: 'Payments',
        path: '/admin/payments'
    },
    {
        icon: "fa-solid fa-users", 
        name: 'Customers',
        path: '/admin/customers'
    }
]

export const adminNavMenu = [
    {
        icon: "fa-solid fa-user", 
        name: 'Profile'
    },
    {
        icon: "fa-solid fa-gear", 
        name: 'Settings'
    },
    {
        icon: "fa-solid fa-arrow-right-from-bracket", 
        name: 'Logout',
    },
]

export const navbarMenu = [
    {
        icon: 'fa-solid fa-house',
        name: 'Home',
        path: '/'
    },
    {
        icon: 'fa-solid fa-couch',
        name: 'Shop',
        path: '/shop'
    },
    {
        icon: 'fa-solid fa-circle-info',
        name: 'About us',
        path: '/about'
    },
    {
        icon: 'fa-solid fa-address-book',
        name: 'Contact',
        path: '/contact'
    },
]

export const filters = [
    'New Arrivals',
    'Bestsellers',
    'All Sofas',
    '3-Seater Sofa',
    'Sectional',
    'Loveseat',
    'Modular Chaise',
]

export const iconMenu = [
    {
        icon: "fa-solid fa-cart-shopping", 
        name: 'Cart',
        path: '/cart'
    },
    {
        icon: "fa-solid fa-heart", 
        name: 'Favorites',
        path: '/favorites'
    },
    {
        icon: "fa-solid fa-circle-user", 
        name: 'Profile',
        path: '/login'
    },
]

export const features = [
    {
        title: 'Designed to Adapt',
        description: 'Modular pieces that rearrange effortlessly — so your sofa grows with your space and your style.'
    },
    {
        title: 'Built with Purpose',
        description: 'Each sofa is made from durable hardwood, premium foam, and tailored upholstery that’s made to last.'
    },
    {
        title: 'Styled for Real Life',
        description: 'Spill-friendly fabrics, easy assembly, and timeless silhouettes — made for everyday comfort without compromise.'
    },
]

export const featuredCategories = [
    {
        category: '3-Seater Sofa',
        description: 'Classic full-size sofa for family or lounge areas',
        img: 'images/3-seater.png'
    },
    {
        category: 'Sectional Sofa',
        description: 'L-shaped or U-shaped sofas, often modular',
        img: 'images/sectional.png'
    },
    {
        category: 'Loveseat',
        description: '2-seater, perfect for smaller spaces',
        img: 'images/loveseat.png'
    }
]

export const footerProducts = [
    {
        name: 'All Sofas',
        path: '/'
    },
    {
        name: '3-Seater Sofa',
        path: '/'
    },
    {
        name: 'Sectionals',
        path: '/'
    },
    {
        name: 'Loveseats',
        path: '/'
    },
    {
        name: 'Single Seater',
        path: '/'
    },
]

export const footerCompany = [
    {
        name: 'About us',
        path: '/about'
    },
    {
        name: 'Careers',
        path: '/careers'
    },
]

export const footerSupport = [
    {
        name: 'FAQ',
        path: '/about'
    },
    {
        name: 'Shipping & Returns',
        path: '/shipping-returns'
    },
    {
        name: 'Contact',
        path: '/contact'
    },
]

export const measurementLabels = [
    {label:'Overall Width', value:'overallWidth'},
    {label:'Depth', value:'depth'},
    {label:'Height', value:'height'},
    {label:'Seat Height', value:'seatHeight'},
    {label:'Seat Depth', value:'seatDepth'},
    {label:'Arm Height', value:'armHeight'},
    {label:'leg Height', value:'legHeight'},
]

export const sofaCategories = [
    '3-Seater Sofa',
    'Sectional Sofa',
    'Loveseat',
    'Single Seater'
]

export const sampleProduct = {
    "_id": {
      "$oid": "6878dbe6d05540d93f63e01e"
    },
    "name": "Solis 3-Seater Modular Sofa",
    "category": "3-Seater Sofa",
    "description": "A bold, retro-inspired 3-seater sofa with plush cushions and a compact modular frame — perfect for bright, modern living spaces.",
    "price": 28900,
    "ratings": 4.8,
    "totalQuantity": 3,
    "totalSold": 0,
    "attributes": {
      "variants": [
        {
          "color": "#EDC96B",
          "quantity": 2,
          "_id": {
            "$oid": "6878dbe6d05540d93f63e01f"
          }
        },
        {
          "color": "#A29F9F",
          "quantity": 1,
          "_id": {
            "$oid": "6878dbe6d05540d93f63e020"
          }
        }
      ],
      "features": [
        "Modular design for flexible layouts",
        "Button-tufted back cushions",
        "Kiln-dried hardwood frame",
        "Solid wood legs with walnut finish",
        "Tool-free assembly",
        "High-resilience foam cushions",
        "Easy-to-clean upholstery"
      ],
      "measurements": {
        "overallWidth": "210 cm (82.6 in)",
        "depth": "90 cm (35.4 in)",
        "height": "80 cm (31.5 in)",
        "seatHeight": "45 cm (17.7 in)",
        "seatDepth": "55 cm (21.6 in)",
        "armHeight": "62 cm (24.4 in)",
        "legHeight": "15 cm (5.9 in)"
      }
    },
    "images": [
        "/images/sample-sofa.png",
        "/images/sample-sofa.png",
        "/images/sample-sofa.png",
    ],
    "createdAt": {
      "$date": "2025-07-17T11:17:58.211Z"
    },
    "__v": 0
}

export const passwordLevels = [
    { status: '', description: '' },
    { status: 'Weak', description: 'Easy to guess. Add more characters or symbols.' },
    { status: 'Fair', description: 'Better, but still guessable. Make it more complex.' },
    { status: 'Strong', description: 'Good password. Try adding a special character.' },
    { status: 'Very Strong', description: 'Excellent! Hard to crack.' }
];

export const productChoices = [
    {
        name: 'Edit'
    },
    {
        name: 'Remove'
    },
    {
        name: 'View'
    },
]