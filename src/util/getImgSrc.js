const getImgSrc=(name,type)=>{
    if(typeof name === 'undefined') return 'error.png'
    if(type == 'play'){
        const path = `/src/assets/${type}/${name}.png`
        const modules = import.meta.globEager(`/src/assets/play/*`)
        return modules[path]?.default
    }
    const path = `/src/assets/images/${name}.png`
    const modules = import.meta.globEager('/src/assets/images/*')
    // console.log(modules);
    return modules[path]?.default
}

export default getImgSrc