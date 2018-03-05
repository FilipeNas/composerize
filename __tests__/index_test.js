/* eslint-env jest */

import Composerize from '../src';

it('fails with invalid commands', () => {
    expect(() => {
        Composerize('foo bar');
    }).toThrow();
});

describe('snapshots', () => {
    const CMDS = [
        'docker run -p 80:80 -v /var/run/docker.sock:/tmp/docker.sock:ro --restart always --log-opt max-size=1g nginx',

        // test spacing
        ' docker   run -p 80:80  -v /var/run/docker.sock:/tmp/docker.sock:ro --restart always --log-opt max-size=1g nginx    ',

        // test multiple args (https://github.com/magicmark/composerize/issues/9)
        'docker run -t --name="youtrack" -v /data/youtrack/data/:/opt/youtrack/data/ -v /data/youtrack/backup/:/opt/youtrack/backup/ -p 80:80 -p 3232:22351 uniplug/youtrack',

        // testing parsing of quotes (https://github.com/magicmark/composerize/issues/10)
        'docker run --name="foobar" nginx',

        'docker run -p 80:80 --name webserver nginx:latest',

        'docker run -p 80:80 foobar/baz:latest',

        // test flag
        'docker run --privileged -p 80:80 foobar/baz:latest',
    ];

    it('match snapshots', () => {
        CMDS.forEach(cmd => {
            expect(Composerize(cmd)).toMatchSnapshot();
        });
    });
});
