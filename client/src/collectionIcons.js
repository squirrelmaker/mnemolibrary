import React, { Component } from 'react';



// ICONS FROM https://fontawesome.com/

export default function getIcon(icon,iconStyle) {
    if (icon === "graduationCap") {
        return <svg  style={iconStyle} aria-hidden="true" data-prefix="fas" data-icon="graduation-cap" className="svg-inline--fa fa-graduation-cap fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M622.34 153.2L343.4 67.5c-15.2-4.67-31.6-4.67-46.79 0L17.66 153.2c-23.54 7.23-23.54 38.36 0 45.59l48.63 14.94c-10.67 13.19-17.23 29.28-17.88 46.9C38.78 266.15 32 276.11 32 288c0 10.78 5.68 19.85 13.86 25.65L20.33 428.53C18.11 438.52 25.71 448 35.94 448h56.11c10.24 0 17.84-9.48 15.62-19.47L82.14 313.65C90.32 307.85 96 298.78 96 288c0-11.57-6.47-21.25-15.66-26.87.76-15.02 8.44-28.3 20.69-36.72L296.6 284.5c9.06 2.78 26.44 6.25 46.79 0l278.95-85.7c23.55-7.24 23.55-38.36 0-45.6zM352.79 315.09c-28.53 8.76-52.84 3.92-65.59 0l-145.02-44.55L128 384c0 35.35 85.96 64 192 64s192-28.65 192-64l-14.18-113.47-145.03 44.56z"></path></svg>
    } else if (icon === "globeAsia") {
        return <svg style={iconStyle} aria-hidden="true" data-prefix="fas" data-icon="globe-asia" className="svg-inline--fa fa-globe-asia fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path fill="currentColor" d="M248 8C111.03 8 0 119.03 0 256s111.03 248 248 248 248-111.03 248-248S384.97 8 248 8zm-11.34 240.23c-2.89 4.82-8.1 7.77-13.72 7.77h-.31c-4.24 0-8.31 1.69-11.31 4.69l-5.66 5.66c-3.12 3.12-3.12 8.19 0 11.31l5.66 5.66c3 3 4.69 7.07 4.69 11.31V304c0 8.84-7.16 16-16 16h-6.11c-6.06 0-11.6-3.42-14.31-8.85l-22.62-45.23c-2.44-4.88-8.95-5.94-12.81-2.08l-19.47 19.46c-3 3-7.07 4.69-11.31 4.69H50.81C49.12 277.55 48 266.92 48 256c0-110.28 89.72-200 200-200 21.51 0 42.2 3.51 61.63 9.82l-50.16 38.53c-5.11 3.41-4.63 11.06.86 13.81l10.83 5.41c5.42 2.71 8.84 8.25 8.84 14.31V216c0 4.42-3.58 8-8 8h-3.06c-3.03 0-5.8-1.71-7.15-4.42-1.56-3.12-5.96-3.29-7.76-.3l-17.37 28.95zM408 358.43c0 4.24-1.69 8.31-4.69 11.31l-9.57 9.57c-3 3-7.07 4.69-11.31 4.69h-15.16c-4.24 0-8.31-1.69-11.31-4.69l-13.01-13.01a26.767 26.767 0 0 0-25.42-7.04l-21.27 5.32c-1.27.32-2.57.48-3.88.48h-10.34c-4.24 0-8.31-1.69-11.31-4.69l-11.91-11.91a8.008 8.008 0 0 1-2.34-5.66v-10.2c0-3.27 1.99-6.21 5.03-7.43l39.34-15.74c1.98-.79 3.86-1.82 5.59-3.05l23.71-16.89a7.978 7.978 0 0 1 4.64-1.48h12.09c3.23 0 6.15 1.94 7.39 4.93l5.35 12.85a4 4 0 0 0 3.69 2.46h3.8c1.78 0 3.35-1.18 3.84-2.88l4.2-14.47c.5-1.71 2.06-2.88 3.84-2.88h6.06c2.21 0 4 1.79 4 4v12.93c0 2.12.84 4.16 2.34 5.66l11.91 11.91c3 3 4.69 7.07 4.69 11.31v24.6z"></path></svg>
    } else if (icon === "balanceScale") {
        return <svg style={iconStyle}  aria-hidden="true" data-prefix="fas" data-icon="balance-scale" className="svg-inline--fa fa-balance-scale fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M256 336h-.02c0-16.18 1.34-8.73-85.05-181.51-17.65-35.29-68.19-35.36-85.87 0C-2.06 328.75.02 320.33.02 336H0c0 44.18 57.31 80 128 80s128-35.82 128-80zM128 176l72 144H56l72-144zm511.98 160c0-16.18 1.34-8.73-85.05-181.51-17.65-35.29-68.19-35.36-85.87 0-87.12 174.26-85.04 165.84-85.04 181.51H384c0 44.18 57.31 80 128 80s128-35.82 128-80h-.02zM440 320l72-144 72 144H440zm88 128H352V153.25c23.51-10.29 41.16-31.48 46.39-57.25H528c8.84 0 16-7.16 16-16V48c0-8.84-7.16-16-16-16H383.64C369.04 12.68 346.09 0 320 0s-49.04 12.68-63.64 32H112c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h129.61c5.23 25.76 22.87 46.96 46.39 57.25V448H112c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h416c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16z"></path></svg>
    } else if (icon === "language") {
        return <svg style={iconStyle} aria-hidden="true" data-prefix="fas" data-icon="language" className="svg-inline--fa fa-language fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M304 416H24c-13.255 0-24-10.745-24-24V120c0-13.255 10.745-24 24-24h280v320zm-120.676-72.622A12 12 0 0 0 194.839 352h22.863c8.22 0 14.007-8.078 11.362-15.861L171.61 167.085a12 12 0 0 0-11.362-8.139h-32.489a12.001 12.001 0 0 0-11.362 8.139L58.942 336.139C56.297 343.922 62.084 352 70.304 352h22.805a12 12 0 0 0 11.535-8.693l9.118-31.807h60.211l9.351 31.878zm-39.051-140.42s4.32 21.061 7.83 33.21l10.8 37.531h-38.07l11.07-37.531c3.51-12.15 7.83-33.21 7.83-33.21h.54zM616 416H336V96h280c13.255 0 24 10.745 24 24v272c0 13.255-10.745 24-24 24zm-36-228h-64v-16c0-6.627-5.373-12-12-12h-16c-6.627 0-12 5.373-12 12v16h-64c-6.627 0-12 5.373-12 12v16c0 6.627 5.373 12 12 12h114.106c-6.263 14.299-16.518 28.972-30.023 43.206-6.56-6.898-12.397-13.91-17.365-20.933-3.639-5.144-10.585-6.675-15.995-3.446l-7.28 4.346-6.498 3.879c-5.956 3.556-7.693 11.421-3.735 17.117 6.065 8.729 13.098 17.336 20.984 25.726-8.122 6.226-16.841 12.244-26.103 17.964-5.521 3.41-7.381 10.556-4.162 16.19l7.941 13.896c3.362 5.883 10.935 7.826 16.706 4.276 12.732-7.831 24.571-16.175 35.443-24.891 10.917 8.761 22.766 17.102 35.396 24.881 5.774 3.556 13.353 1.618 16.717-4.27l7.944-13.903c3.213-5.623 1.37-12.76-4.135-16.171a312.737 312.737 0 0 1-26.06-18.019c21.024-22.425 35.768-46.289 42.713-69.85H580c6.627 0 12-5.373 12-12v-16c0-6.625-5.373-11.998-12-11.998z"></path></svg>
    } else if (icon === "database") {
         return <svg style={iconStyle} aria-hidden="true" data-prefix="fas" data-icon="database" className="svg-inline--fa fa-database fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M448 73.143v45.714C448 159.143 347.667 192 224 192S0 159.143 0 118.857V73.143C0 32.857 100.333 0 224 0s224 32.857 224 73.143zM448 176v102.857C448 319.143 347.667 352 224 352S0 319.143 0 278.857V176c48.125 33.143 136.208 48.572 224 48.572S399.874 209.143 448 176zm0 160v102.857C448 479.143 347.667 512 224 512S0 479.143 0 438.857V336c48.125 33.143 136.208 48.572 224 48.572S399.874 369.143 448 336z"></path></svg>
    } else if (icon === "child") {
        return <svg style={iconStyle} aria-hidden="true" data-prefix="fas" data-icon="child" className="svg-inline--fa fa-child fa-w-12" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M120 72c0-39.765 32.235-72 72-72s72 32.235 72 72c0 39.764-32.235 72-72 72s-72-32.236-72-72zm254.627 1.373c-12.496-12.497-32.758-12.497-45.254 0L242.745 160H141.254L54.627 73.373c-12.496-12.497-32.758-12.497-45.254 0-12.497 12.497-12.497 32.758 0 45.255L104 213.254V480c0 17.673 14.327 32 32 32h16c17.673 0 32-14.327 32-32V368h16v112c0 17.673 14.327 32 32 32h16c17.673 0 32-14.327 32-32V213.254l94.627-94.627c12.497-12.497 12.497-32.757 0-45.254z"></path></svg>
    } else if (icon === "chalkBoard") {
        return <svg style={iconStyle} aria-hidden="true" data-prefix="fas" data-icon="chalkboard" className="svg-inline--fa fa-chalkboard fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M96 64h448v352h64V40c0-22.06-17.94-40-40-40H72C49.94 0 32 17.94 32 40v376h64V64zm528 384H480v-64H288v64H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h608c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16z"></path></svg>
    } else if (icon === "brain") {
        return <svg style={iconStyle}  aria-hidden="true" data-prefix="fas" data-icon="brain" className="svg-inline--fa fa-brain fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M208 0c-29.87 0-54.74 20.55-61.8 48.22-.75-.02-1.45-.22-2.2-.22-35.34 0-64 28.65-64 64 0 4.84.64 9.51 1.66 14.04C52.54 138 32 166.57 32 200c0 12.58 3.16 24.32 8.34 34.91C16.34 248.72 0 274.33 0 304c0 33.34 20.42 61.88 49.42 73.89-.9 4.57-1.42 9.28-1.42 14.11 0 39.76 32.23 72 72 72 4.12 0 8.1-.55 12.03-1.21C141.61 491.31 168.25 512 200 512c39.77 0 72-32.24 72-72V205.45c-10.91 8.98-23.98 15.45-38.36 18.39-4.97 1.02-9.64-2.82-9.64-7.89v-16.18c0-3.57 2.35-6.78 5.8-7.66 24.2-6.16 42.2-27.95 42.2-54.04V64c0-35.35-28.66-64-64-64zm368 304c0-29.67-16.34-55.28-40.34-69.09 5.17-10.59 8.34-22.33 8.34-34.91 0-33.43-20.54-62-49.66-73.96 1.02-4.53 1.66-9.2 1.66-14.04 0-35.35-28.66-64-64-64-.75 0-1.45.2-2.2.22C422.74 20.55 397.87 0 368 0c-35.34 0-64 28.65-64 64v74.07c0 26.09 17.99 47.88 42.2 54.04 3.46.88 5.8 4.09 5.8 7.66v16.18c0 5.07-4.68 8.91-9.64 7.89-14.38-2.94-27.44-9.41-38.36-18.39V440c0 39.76 32.23 72 72 72 31.75 0 58.39-20.69 67.97-49.21 3.93.67 7.91 1.21 12.03 1.21 39.77 0 72-32.24 72-72 0-4.83-.52-9.54-1.42-14.11 29-12.01 49.42-40.55 49.42-73.89z"></path></svg>
    } else if (icon === "userGraduate") {
        return  <svg  style={iconStyle} aria-hidden="true" data-prefix="fas" data-icon="user-graduate" className="svg-inline--fa fa-user-graduate fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M319.4 320.6L224 416l-95.4-95.4C57.1 323.7 0 382.2 0 454.4v9.6c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-9.6c0-72.2-57.1-130.7-128.6-133.8zM13.6 79.8l6.4 1.5v58.4c-7 4.2-12 11.5-12 20.3 0 8.4 4.6 15.4 11.1 19.7L3.5 242c-1.7 6.9 2.1 14 7.6 14h41.8c5.5 0 9.3-7.1 7.6-14l-15.6-62.3C51.4 175.4 56 168.4 56 160c0-8.8-5-16.1-12-20.3V87.1l66 15.9c-8.6 17.2-14 36.4-14 57 0 70.7 57.3 128 128 128s128-57.3 128-128c0-20.6-5.3-39.8-14-57l96.3-23.2c18.2-4.4 18.2-27.1 0-31.5l-190.4-46c-13-3.1-26.7-3.1-39.7 0L13.6 48.2c-18.1 4.4-18.1 27.2 0 31.6z"></path></svg>
    } else if (icon === "book") {
        return <svg  style={iconStyle} aria-hidden="true" data-prefix="fas" data-icon="book-open" className="svg-inline--fa fa-book-open fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M542.22 32.05c-54.8 3.11-163.72 14.43-230.96 55.59-4.64 2.84-7.27 7.89-7.27 13.17v363.87c0 11.55 12.63 18.85 23.28 13.49 69.18-34.82 169.23-44.32 218.7-46.92 16.89-.89 30.02-14.43 30.02-30.66V62.75c.01-17.71-15.35-31.74-33.77-30.7zM264.73 87.64C197.5 46.48 88.58 35.17 33.78 32.05 15.36 31.01 0 45.04 0 62.75V400.6c0 16.24 13.13 29.78 30.02 30.66 49.49 2.6 149.59 12.11 218.77 46.95 10.62 5.35 23.21-1.94 23.21-13.46V100.63c0-5.29-2.62-10.14-7.27-12.99z"></path></svg>
    } else if (icon === "userFriends") {
        return <svg aria-hidden="true" style={iconStyle} data-prefix="fas" data-icon="user-friends" className="svg-inline--fa fa-user-friends fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M192 256c61.9 0 112-50.1 112-112S253.9 32 192 32 80 82.1 80 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C51.6 288 0 339.6 0 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zM480 256c53 0 96-43 96-96s-43-96-96-96-96 43-96 96 43 96 96 96zm48 32h-3.8c-13.9 4.8-28.6 8-44.2 8s-30.3-3.2-44.2-8H432c-20.4 0-39.2 5.9-55.7 15.4 24.4 26.3 39.7 61.2 39.7 99.8v38.4c0 2.2-.5 4.3-.6 6.4H592c26.5 0 48-21.5 48-48 0-61.9-50.1-112-112-112z"></path></svg>
    } else if (icon === "starOfLife") {
        return <svg aria-hidden="true"  style={iconStyle} data-prefix="fas" data-icon="star-of-life" className="svg-inline--fa fa-star-of-life fa-w-15" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 512"><path fill="currentColor" d="M471.99 334.43L336.06 256l135.93-78.43c7.66-4.42 10.28-14.2 5.86-21.86l-32.02-55.43c-4.42-7.65-14.21-10.28-21.87-5.86l-135.93 78.43V16c0-8.84-7.17-16-16.01-16h-64.04c-8.84 0-16.01 7.16-16.01 16v156.86L56.04 94.43c-7.66-4.42-17.45-1.79-21.87 5.86L2.15 155.71c-4.42 7.65-1.8 17.44 5.86 21.86L143.94 256 8.01 334.43c-7.66 4.42-10.28 14.21-5.86 21.86l32.02 55.43c4.42 7.65 14.21 10.27 21.87 5.86l135.93-78.43V496c0 8.84 7.17 16 16.01 16h64.04c8.84 0 16.01-7.16 16.01-16V339.14l135.93 78.43c7.66 4.42 17.45 1.8 21.87-5.86l32.02-55.43c4.42-7.65 1.8-17.43-5.86-21.85z"></path></svg>
    } else if (icon === "globe") {
        return  <svg aria-hidden="true" style={iconStyle} data-prefix="fas" data-icon="globe" className="svg-inline--fa fa-globe fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path fill="currentColor" d="M336.5 160C322 70.7 287.8 8 248 8s-74 62.7-88.5 152h177zM152 256c0 22.2 1.2 43.5 3.3 64h185.3c2.1-20.5 3.3-41.8 3.3-64s-1.2-43.5-3.3-64H155.3c-2.1 20.5-3.3 41.8-3.3 64zm324.7-96c-28.6-67.9-86.5-120.4-158-141.6 24.4 33.8 41.2 84.7 50 141.6h108zM177.2 18.4C105.8 39.6 47.8 92.1 19.3 160h108c8.7-56.9 25.5-107.8 49.9-141.6zM487.4 192H372.7c2.1 21 3.3 42.5 3.3 64s-1.2 43-3.3 64h114.6c5.5-20.5 8.6-41.8 8.6-64s-3.1-43.5-8.5-64zM120 256c0-21.5 1.2-43 3.3-64H8.6C3.2 212.5 0 233.8 0 256s3.2 43.5 8.6 64h114.6c-2-21-3.2-42.5-3.2-64zm39.5 96c14.5 89.3 48.7 152 88.5 152s74-62.7 88.5-152h-177zm159.3 141.6c71.4-21.2 129.4-73.7 158-141.6h-108c-8.8 56.9-25.6 107.8-50 141.6zM19.3 352c28.6 67.9 86.5 120.4 158 141.6-24.4-33.8-41.2-84.7-50-141.6h-108z"></path></svg>
    } else{
        return [];
    }

}
