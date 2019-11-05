function checkNull(raw, data) {
    for (var r in data) {
        if (data[r] != null) {
            raw[r] = data[r];
        }
    }
    return raw;
}
global.checkNull = checkNull;