export async function loadLayoutMiddleware(route) {
    try {
        let layout = route.meta.layout
        let layoutComponent = await import(`@/layouts/${layout}.vue`)
        route.meta.layoutComponent = layoutComponent.default
    } catch {
        // console.error('Error occurred in processing of layouts: ', e)
        // console.log('Mounted default layout DefaultLayout')
        let layout = 'DefaultLayout'
        let layoutComponent = await import(`@/layouts/${layout}.vue`)
        route.meta.layoutComponent = layoutComponent.default
    }
}