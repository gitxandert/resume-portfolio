# I built a kernel!

In less than an afternoon's time, I followed the Bare Bones tutorial on OSDev.org, built a cross-compiler, typed up assembly and linker code, and created a boot image for my very own kernel, which I got to see in Qemu. I felt so accomplished! It's wild to think that, just a few months ago, I had no idea about Linux internals or operating systems or systems programming in general, and now I've progressed far beyond mere comfort with C, Vim, command line scripting, and systemd, and have even made, myself (me!), my very own kernel, upon which to build and iterate and put the concepts I've been reading about (free lists, memory allocators, concurrency) into practice -- and maybe even introduce some of my own innovations while I'm at it.

If you don't know much about what I'm talking about, you might be impressed, albeit probably in an aloof way.

If you know as much as I know now, a mere week after building the kernel, you might feel a little embarrassed.

If you have any more expertise than I have at this moment, you might, in the best case, smile at my naivete or, in the worst case, think I'm an idiot. Most likely you'd either consider me a dilettante or think I have a bad case of Dunning-Kruger.

Maybe the most (how do I put this.) *gracious* way to appraise me right now, from parties with diverse experience with operating systems, is to admire me for my enthusiasm. I'm nothing if not enthused; however, I'm barely anything more than enthused at this point. Because the thing is, after building the kernel, which is pretty much simply the point of entry when interfacing with the hardware, *it's not at all straightforward how one should continue*.

For example, you might think that, well, might as well get a shell up and running. Seems simple enough, right? After all, in UNIX/POSIX environments, there exist tons of (believe me) blissfully straightforward syscalls and library functionsthat read lines from the standard input and execute programs and processes on your behalf.

How exactly does that work in an environment where you have only a handful of C headers, are currently only able to print hard-coded strings, and don't even *have* a standard input? You'd have to first figure out how to get input *from the keyboard*, then somehow print that to the screen. And since you're working on a **shell**, you'd also need to figure out not only how to fork processes, *but also how to write them*. So you can see that already fairly simple programs quickly become **very** involved. Building an operating system goes far beyond simply knowing APIs and what they do, but how exactly the hardware itself supports the very scaffolding in which those APIs can do all of the magic that makes advanced programming in UNIX feel, comparatively, like a breeze.

Suffice it to say that I got overwhelmed pretty quickly. Not only that, but I'm also not exactly a full-time OS developer; I'm still learning about the fundamental *concepts* involved, the basic mechanisms and procedures and higher-level library functions and assembly code and even Rust now, goddamit; I'm also still working on some ML and devops projects (for fun, at this point); **I'M ALSO STILL UNEMPLOYED AND ACTIVELY APPLYING TO MULTIPLE JOBS A DAY**. So not only am I still wrapping my head around even *how* to think about this stuff, but I also don't even have much time *to* think about it, let alone deeply. Writing out my thoughts in this blog was when it finally clicked for me how I could even *start thinking about* some input and output functions, in my cute little dumb toy kernel...

So I'm still enthused, because this stuff really interests me, but I'm taking several steps back and assessing what's practical for me to handle right now. I'm first going to get familiar with building need-to-know UNIX applications (I made a shell today [yaaay] and will start working on a file copier soon), and I'm going to learn how to build them in both C and Rust, since the future's looking very security/safety-minded. I'm going to finish OSTEP, PC Assembly, APUE, and probably Concurrency in C++ and start reading about TCP/IP and networking. I'm going to get more involved with open source projects that could use people like me (actually interested in this stuff) helping out. And maybe, *maybe* then, I'll start thinking about how to implement anything I've been learning literally from scratch.

Also, I thought it might help to look at the Linux repo, to um, give me ideas.

It didn't. I gave up and practiced some Javascript to feel mighty again instead.

I'm indefatigable! But greatly humbled and gratefully taking many steps back.
