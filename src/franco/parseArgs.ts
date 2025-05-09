export function parseArguments(args: string[]) {
    // Valeurs par défaut
    let result = {
        settings: null as string[],
        count: null,
        mode: 'easy',
        mq: 0,
        list: false,
        help: false
    };

    // Parcours du tableau pour assigner les valeurs
    args.forEach(arg => {
        if (arg.startsWith('settings=')) {
            result.settings = arg.slice('settings='.length).split(';')
        } else if (arg.startsWith('count=')) {
            result.count = parseInt(arg.slice('count='.length))
        } else if (arg === 'help') {
            result.help = true
        } else if (arg === 'list') {
            result.list = true
        } else if(arg.startsWith('mode=')) {
            result.mode = arg.slice('mode='.length)
        } else if(arg.startsWith('mq=')) {
            result.mq = parseInt(arg.slice('mq='.length))
        }
    });

    return result;
}