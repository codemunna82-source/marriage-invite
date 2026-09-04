Now playing
-----------
wedding.mp3     "Wedding Invitation" by Sahil Madan, from Pixabay.
                Pixabay Content License: free to use here, commercially or
                not, attribution appreciated but not required.
                Credit line, if you want one:
                    Music by Sahil Madan from Pixabay

                The original is 32.8s and does not end where it begins, so its
                last 1.6s were crossfaded over its first. What ships is a
                31.3s stereo loop that joins invisibly, lifted 1.75x in level
                with no clipping. 128 kbps, 489 KB.

invocation.mp3  A shankh - the conch blown once, with temple bells and
                manjira, timed to the doors opening. OFF by default: only the
                track above plays. To bring it back, set in script.js:
                    invocation: "assets/music/invocation.mp3"
                Synthesised, so nothing is licensed.

Replacing them
--------------
Drop your own file in as wedding.mp3 AND bump the ?v= number on
weddingData.music in script.js (e.g. wedding.mp3?v=3). Without a new address,
anyone who already opened the invitation keeps hearing the old track from
their browser cache. Or point weddingData.music at a different filename
(.mp3, .m4a and .ogg all work).

Keep the loop under a couple of megabytes so the invitation stays quick on
mobile data. If your track does not end where it begins, crossfade its tail
over its head or the loop will tick every time round.

The site never autoplays: the track starts only after the visitor taps
"ENTER WEDDING", and the floating music button toggles it at any time.
