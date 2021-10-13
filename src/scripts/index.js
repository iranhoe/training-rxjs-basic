import { forkJoin } from "rxjs";
import { ajax } from "rxjs/ajax";

const GITHUB_API_BASE = 'https://api.github.com';

forkJoin({
    user: ajax.getJSON(
        `${GITHUB_API_BASE}/users/reactivex`
    ),
    repo: ajax.getJSON(
        `${GITHUB_API_BASE}/users/reactivex/repos`
    )
}).subscribe(console.log)