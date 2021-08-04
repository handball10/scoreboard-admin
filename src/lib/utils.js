export const formatSeconds = (s) => (s-(s%=60))/60+(9<s?':':':0')+s;

export const parseTimeFromString = time => time.trim().split(':').reverse().reduce((acc, item, index) => {
    return acc + (
        parseInt(item) * (index === 0 ? 1 : (index * 60))
    )
}, 0);

export const filePathTransformer = path => `http://localhost:8000/file?file=${btoa(path.replaceAll('\\', '\\\\'))}`;